# AssetFlow — System Design Document

## 1. Overview

**AssetFlow** is an Enterprise Asset & Resource Management System built on the MERN stack. It enables organizations to track, allocate, book, maintain, and audit their physical and digital assets across departments.

---

## 2. High-Level Architecture

```mermaid
graph TB
    Client["React Frontend"]
    API["Express.js API Server"]
    Auth["Auth Middleware (JWT)"]
    RBAC["Roles Guard (RBAC)"]
    Routes["Route Layer"]
    Controllers["Controller Layer"]
    Services["Service Layer"]
    Repos["Repository Layer"]
    DB["SQLite (Sequelize)"]

    Client -->|HTTP Requests| API
    API --> Auth
    Auth --> RBAC
    RBAC --> Routes
    Routes --> Controllers
    Controllers --> Services
    Services --> Repos
    Repos --> DB
```

---

## 3. Request Lifecycle

Every incoming API request flows through a predictable pipeline:

```mermaid
sequenceDiagram
    participant C as Client
    participant RL as Request Logger
    participant AM as Auth Middleware
    participant RG as Roles Guard
    participant VM as Validate Middleware
    participant CT as Controller
    participant SV as Service
    participant RP as Repository
    participant DB as SQLite

    C->>RL: HTTP Request
    RL->>AM: Log & Forward
    AM->>RG: Verify JWT Token
    RG->>VM: Check Role Permissions
    VM->>CT: Validate Request Body
    CT->>SV: Call Business Logic
    SV->>RP: Data Access
    RP->>DB: Query / Mutation
    DB-->>RP: Result
    RP-->>SV: Data
    SV-->>CT: Processed Result
    CT-->>C: JSON Response
```

---

## 4. Folder Structure & Layer Responsibilities

```
backend/
├── src/
│   ├── config/         → Environment variables, DB URI, JWT secret
│   ├── database/       → Mongoose connection setup
│   ├── auth/           → JWT verification, Role-based access guard
│   ├── middleware/      → Error handler, Request logger, Validation
│   ├── models/         → Mongoose schemas for all domain entities
│   ├── routes/         → Express routers mapping URLs to controllers
│   ├── controllers/    → HTTP request handlers (no business logic)
│   ├── services/       → Business logic layer
│   ├── repositories/   → Data access abstraction over Mongoose
│   ├── validations/    → Request payload schemas
│   ├── constants/      → Roles, error codes, messages
│   ├── helpers/        → Standardized response format
│   ├── utils/          → Date, crypto, and generic utilities
│   ├── app.js          → Express app setup (cors, json, middlewares)
│   └── server.js       → Entry point (connect DB, start server)
└── package.json
```

| Layer | Responsibility | Rule |
|-------|---------------|------|
| **Routes** | Map URL paths to controllers | No logic here |
| **Controllers** | Parse request, call service, send response | No DB queries |
| **Services** | Business rules and orchestration | No HTTP awareness |
| **Repositories** | Raw data access (find, create, update, delete) | No business rules |
| **Models** | Define data shape and relationships | Schema only |

---

## 5. Entity Relationship Diagram

```mermaid
erDiagram
    DEPARTMENT ||--o{ EMPLOYEE : "has many"
    ROLE ||--o{ EMPLOYEE : "assigned to"
    ASSET_CATEGORY ||--o{ ASSET : "classifies"

    EMPLOYEE ||--o{ ASSET_ALLOCATION : "receives"
    ASSET ||--o{ ASSET_ALLOCATION : "allocated via"

    EMPLOYEE ||--o{ TRANSFER_REQUEST : "requests"
    ASSET ||--o{ TRANSFER_REQUEST : "transferred via"
    DEPARTMENT ||--o{ TRANSFER_REQUEST : "from/to"

    EMPLOYEE ||--o{ RESOURCE_BOOKING : "books"
    ASSET ||--o{ RESOURCE_BOOKING : "booked via"

    EMPLOYEE ||--o{ MAINTENANCE_REQUEST : "reports"
    ASSET ||--o{ MAINTENANCE_REQUEST : "maintained via"

    AUDIT_CYCLE ||--o{ AUDIT_RECORD : "contains"
    ASSET ||--o{ AUDIT_RECORD : "audited via"
    EMPLOYEE ||--o{ AUDIT_RECORD : "audited by"

    EMPLOYEE ||--o{ NOTIFICATION : "receives"
    EMPLOYEE ||--o{ ACTIVITY_LOG : "performs"

    DEPARTMENT {
        ObjectId _id
        String name
        String description
        ObjectId head
    }

    ROLE {
        ObjectId _id
        String name
        Array permissions
    }

    EMPLOYEE {
        ObjectId _id
        String firstName
        String lastName
        String email
        ObjectId department
        ObjectId role
        Boolean isActive
    }

    ASSET_CATEGORY {
        ObjectId _id
        String name
        String description
    }

    ASSET {
        ObjectId _id
        String name
        String description
        String serialNumber
        ObjectId category
        String status
    }

    ASSET_ALLOCATION {
        ObjectId _id
        ObjectId asset
        ObjectId employee
        Date allocatedDate
        Date returnDate
        String status
    }

    TRANSFER_REQUEST {
        ObjectId _id
        ObjectId asset
        ObjectId fromEmployee
        ObjectId toEmployee
        ObjectId fromDepartment
        ObjectId toDepartment
        String status
    }

    RESOURCE_BOOKING {
        ObjectId _id
        ObjectId asset
        ObjectId employee
        Date startDate
        Date endDate
        String status
    }

    MAINTENANCE_REQUEST {
        ObjectId _id
        ObjectId asset
        ObjectId reportedBy
        String issueDescription
        Number cost
        String status
    }

    AUDIT_CYCLE {
        ObjectId _id
        String name
        Date startDate
        Date endDate
        String status
    }

    AUDIT_RECORD {
        ObjectId _id
        ObjectId auditCycle
        ObjectId asset
        ObjectId auditedBy
        String condition
        String status
    }

    NOTIFICATION {
        ObjectId _id
        ObjectId recipient
        String message
        Boolean isRead
        String type
    }

    ACTIVITY_LOG {
        UUID id
        UUID actorId
        String action
        String entityType
        UUID entityId
        Object details
    }
```

---

## 6. Authentication & Authorization Flow

```mermaid
flowchart LR
    A["Client sends credentials"] --> B["POST /api/auth/login"]
    B --> C["AuthService verifies password"]
    C -->|Valid| D["Generate JWT with role"]
    C -->|Invalid| E["401 Unauthorized"]
    D --> F["Return token to client"]
    F --> G["Client stores token"]
    G --> H["Client sends token in Authorization header"]
    H --> I["auth.middleware.js verifies JWT"]
    I -->|Valid| J["roles.guard.js checks permissions"]
    J -->|Allowed| K["Request proceeds to controller"]
    J -->|Denied| L["403 Forbidden"]
    I -->|Invalid| M["401 Unauthorized"]
```

### Supported Roles

| Role | Description |
|------|-------------|
| **Admin** | Full system access. Manages users, assets, and all configurations. |
| **Asset Manager** | Manages asset lifecycle — allocation, transfers, maintenance, audits. |
| **Department Head** | Manages department-level asset requests and approvals. |
| **Employee** | Can view allocated assets, request bookings, and report issues. |

---

## 7. API Design Overview

All APIs follow RESTful conventions and return a standardized JSON format:

```json
{
  "success": true,
  "message": "Description of result",
  "data": {}
}
```

### Core API Groups

| Group | Base Path | Description |
|-------|-----------|-------------|
| Auth | `/api/auth` | Login, register, token refresh |
| Departments | `/api/departments` | CRUD for departments |
| Employees | `/api/employees` | CRUD for employees |
| Assets | `/api/assets` | CRUD for assets |
| Asset Categories | `/api/asset-categories` | CRUD for asset categories |
| Allocations | `/api/allocations` | Asset allocation records |
| Transfers | `/api/transfers` | Transfer requests |
| Bookings | `/api/bookings` | Resource booking |
| Maintenance | `/api/maintenance` | Maintenance requests |
| Audits | `/api/audits` | Audit cycles and records |
| Notifications | `/api/notifications` | User notifications |
| Activity Logs | `/api/activity-logs` | System activity trail |

---

## 8. Error Handling Strategy

```mermaid
flowchart TD
    A["Request enters Express"] --> B{"Route exists?"}
    B -->|No| C["404 Not Found"]
    B -->|Yes| D{"Validation passes?"}
    D -->|No| E["400 Bad Request + validation errors"]
    D -->|Yes| F{"Auth token valid?"}
    F -->|No| G["401 Unauthorized"]
    F -->|Yes| H{"Role permitted?"}
    H -->|No| I["403 Forbidden"]
    H -->|Yes| J{"Business logic succeeds?"}
    J -->|No| K["Custom error with status code"]
    J -->|Yes| L["200/201 Success response"]
    K --> M["errorHandler.middleware.js"]
    M --> N["Standardized error JSON"]
```

All errors are caught by the global `errorHandler.middleware.js` and returned in a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": null
}
```

In development mode, the stack trace is included in the `errors` field for debugging.

---

## 9. Technology Stack Summary

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | SQLite |
| ORM | Sequelize |
| Auth | JWT (jsonwebtoken) |
| Validation | Zod (or manual) |
| CORS | cors package |
| Environment | dotenv |
| Frontend | React (separate module) |

---

## 10. How to Extend (For Teammates)

To add a new feature module (e.g., "Maintenance Workflows"):

1. Write the business logic in `src/services/maintenance.service.js`
2. Create the controller in `src/controllers/maintenance.controller.js`
3. Add validation schemas in `src/validations/maintenance.validation.js`
4. Define routes in `src/routes/maintenance.routes.js`
5. Register the routes in `src/routes/index.js`
6. The model (`maintenanceRequest.model.js`) is already provided

**Do NOT modify**: `app.js`, `server.js`, `connection.js`, `env.config.js`, or any middleware files unless absolutely necessary. These are shared infrastructure.

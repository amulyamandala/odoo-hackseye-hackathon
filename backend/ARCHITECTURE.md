# AssetFlow - Backend Foundation Architecture

Welcome to the backend foundation for **AssetFlow**, an Enterprise Asset & Resource Management System. This document outlines the core architecture, module responsibilities, and guidelines for extending the backend.

## 🚀 Tech Stack (MERN)
- **Database**: MongoDB (via Mongoose ODM)
- **Backend Framework**: Express.js
- **Runtime**: Node.js
- **Frontend**: React (Implemented in a separate directory/module)
- **Language**: JavaScript

## 📁 Folder Structure

The project follows a modular, layered architecture to keep components loosely coupled. All backend code resides inside the `backend/` directory.

```
backend/
├── src/
│   ├── api/           # Future grouping of versioned API routes
│   ├── auth/          # Authentication & Authorization foundation (Roles, Guards)
│   ├── config/        # Environment and 3rd party service configurations
│   ├── constants/     # Reusable constants (Error Codes, Messages, Role Enums)
│   ├── controllers/   # Request/Response handling (No business logic here!)
│   ├── database/      # DB connection setup and schema definitions
│   ├── helpers/       # Reusable helpers (e.g., standardized API responses)
│   ├── middleware/    # Express middlewares (Error handling, validation, logging)
│   ├── models/        # Database entities/schemas
│   ├── repositories/  # Data access layer (Query abstraction)
│   ├── routes/        # Express route definitions linking to controllers
│   ├── services/      # Core business logic
│   ├── utils/         # Generic utilities (Dates, Crypto)
│   ├── validations/   # Request payload validation schemas (e.g., Joi, Zod)
│   ├── app.js         # Express app initialization and middleware binding
│   └── server.js      # HTTP server entry point
├── package.json
```

---

## 🏗 Module Responsibilities (How to Extend)

When adding a new feature (e.g., "Asset Booking"), follow this flow:

1. **Model** (`src/models/`): Define the database schema/entity for the new resource.
2. **Repository** (`src/repositories/`): Add data access functions for the entity (find, create, update, etc.).
3. **Service** (`src/services/`): Implement the business logic (e.g., checking if the asset is available before booking).
4. **Controller** (`src/controllers/`): Extract data from the HTTP request, call the Service, and return an HTTP response using Helpers.
5. **Validation** (`src/validations/`): Define the expected payload schema.
6. **Route** (`src/routes/`): Define the endpoint (e.g., `POST /bookings`), attach the validation middleware, auth middleware, and controller.

---

## 🔐 Authentication & Roles

The authentication foundation is prepared in `src/auth/` and `src/constants/roles.constants.ts`. 

**Supported Roles:**
- `Admin`
- `Asset Manager`
- `Department Head`
- `Employee`

Use the `auth.middleware.ts` to verify tokens and extract user sessions.
Use `roles.guard.ts` on specific routes to enforce role-based access control (RBAC).

---

## 🗄 Core Domain Entities

The database structure is built around the central **Asset** entity. The models are created as skeletons in `src/models/`.

### Entities:
- **Department**: Grouping of employees.
- **Employee**: Users of the system (linked to Department and Role).
- **Role**: Defines permissions (Admin, Asset Manager, etc.).
- **Asset Category**: Classifications for assets (e.g., Laptops, Vehicles).
- **Asset**: The core entity.
- **Asset Allocation**: Records of an asset assigned to an employee.
- **Transfer Request**: Requests to move an asset between departments or users.
- **Resource Booking**: Temporary reservations of shared assets.
- **Maintenance Request**: Logs for asset repairs/servicing.
- **Audit Cycle & Audit Record**: For tracking physical presence and condition of assets.
- **Notification & Activity Log**: System-wide alerting and audit trails.

**Design Rule:** Use Mongoose Schemas to define entities. Keep models normalized where appropriate, but consider MongoDB's document-oriented nature. Reference related entities via `ObjectId` refs (`mongoose.Schema.Types.ObjectId`).

---

## 📡 API Guidelines

- Keep APIs RESTful.
- Do not put business logic in controllers; delegate to services.
- Always use the centralized `response.helper.ts` for uniform JSON responses.
- All unexpected errors should be caught and routed to `errorHandler.middleware.ts`.

---

## 🌳 Git Workflow Reminder

1. **Never commit directly to `main` or `develop`.**
2. Always branch off the latest `develop` branch.
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/<your-feature-name>
   ```
3. Submit a Pull Request targeting `develop` when your work is complete.
4. Have at least one other member review your PR before merging.

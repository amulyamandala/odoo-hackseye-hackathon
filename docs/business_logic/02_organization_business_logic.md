# Module 02 — Organization Setup

## Overview
Admin-only module for managing the foundational master data: **Departments**, **Asset Categories**, **Employees**, and **Roles**. This data drives dropdowns and filters across every other module.

---

## Sub-Module: Departments

### Entity: Department
```
{
  _id:         ObjectId,
  name:        String (required, unique),
  description: String,
  head:        ObjectId → Employee (nullable)
}
```
Ref: [department.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/department.model.js)

### Business Rules

#### BR-DEPT-01: Create Department
1. Accept: `name`, `description`, `head` (optional)
2. Validate `name` is unique (case-insensitive) → 409 if exists
3. If `head` is provided, verify the employee exists and `isActive === true`
4. Create department
5. **Log Activity**: `DEPARTMENT_CREATED`
6. **Notify**: If `head` is assigned, notify that employee

#### BR-DEPT-02: Update Department
1. Accept: `name`, `description`, `head`
2. If changing `name`, validate new name is unique
3. If changing `head`, verify the new head employee exists and is active
4. If removing `head` (setting to null), that's allowed
5. Update department
6. **Log Activity**: `DEPARTMENT_UPDATED`

#### BR-DEPT-03: Delete Department
1. **Cannot delete** if any active employees belong to this department
2. **Cannot delete** if any active assets are allocated to employees in this department
3. If no dependencies → soft delete (mark `isActive: false`) or hard delete
4. **Log Activity**: `DEPARTMENT_DELETED`

#### BR-DEPT-04: List Departments
1. Return all departments with populated `head` (firstName, lastName, email)
2. Support search by `name`
3. Support pagination

#### BR-DEPT-05: Get Department by ID
1. Return single department with populated `head`
2. 404 if not found

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/departments` | Admin | Create |
| `GET` | `/api/departments` | Admin, Asset Manager | List all |
| `GET` | `/api/departments/:id` | Admin, Asset Manager | Get one |
| `PUT` | `/api/departments/:id` | Admin | Update |
| `DELETE` | `/api/departments/:id` | Admin | Delete |

---

## Sub-Module: Asset Categories

### Entity: AssetCategory
```
{
  _id:         ObjectId,
  name:        String (required, unique),
  description: String
}
```
Ref: [assetCategory.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/assetCategory.model.js)

### Business Rules

#### BR-CAT-01: Create Category
1. Accept: `name`, `description`
2. Validate `name` is unique → 409 if exists
3. Create category
4. **Log Activity**: `CATEGORY_CREATED`

#### BR-CAT-02: Update Category
1. If changing `name`, validate uniqueness
2. Update
3. **Log Activity**: `CATEGORY_UPDATED`

#### BR-CAT-03: Delete Category
1. **Cannot delete** if any assets reference this category
2. Return 409 with message "Cannot delete category with existing assets"
3. **Log Activity**: `CATEGORY_DELETED`

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/asset-categories` | Admin | Create |
| `GET` | `/api/asset-categories` | Admin, Asset Manager | List all |
| `GET` | `/api/asset-categories/:id` | Admin, Asset Manager | Get one |
| `PUT` | `/api/asset-categories/:id` | Admin | Update |
| `DELETE` | `/api/asset-categories/:id` | Admin | Delete |

---

## Sub-Module: Employee Directory

### Entity: Employee
```
{
  _id:         ObjectId,
  firstName:   String (required),
  lastName:    String (required),
  email:       String (required, unique),
  password:    String (required, select: false),
  department:  ObjectId → Department,
  role:        ObjectId → Role,
  isActive:    Boolean (default: true),
  lastLogin:   Date
}
```
Ref: [employee.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/employee.model.js)

### Business Rules

#### BR-EMP-01: Create Employee (Admin only)
1. Accept: `firstName`, `lastName`, `email`, `password`, `department`, `role`
2. Validate email is unique → 409 if exists
3. Validate `department` exists
4. Validate `role` exists
5. Hash password with bcrypt
6. Create employee
7. **Log Activity**: `EMPLOYEE_CREATED`
8. **Notify**: Send welcome notification to the new employee

#### BR-EMP-02: Update Employee
1. Admin can update any field except `password` (use change-password endpoint)
2. If changing `department`, validate new department exists
3. If changing `role`, validate new role exists
4. **Log Activity**: `EMPLOYEE_UPDATED`

#### BR-EMP-03: Deactivate Employee
1. Set `isActive = false`
2. **Check**: If employee has any active asset allocations → warn (don't block, but flag)
3. **Check**: If employee has upcoming bookings → auto-cancel them
4. **Log Activity**: `EMPLOYEE_DEACTIVATED`

#### BR-EMP-04: Reactivate Employee
1. Set `isActive = true`
2. **Log Activity**: `EMPLOYEE_REACTIVATED`

#### BR-EMP-05: List Employees
1. Return all employees (with populated department and role)
2. Filters: `department`, `role`, `isActive`, search by `name` or `email`
3. Support pagination

#### BR-EMP-06: Get Employee by ID
1. Return employee with populated references
2. 404 if not found

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/employees` | Admin | Create |
| `GET` | `/api/employees` | Admin, Asset Manager | List (filterable) |
| `GET` | `/api/employees/:id` | Admin, Asset Manager, Dept Head (own dept) | Get one |
| `PUT` | `/api/employees/:id` | Admin | Update |
| `PATCH` | `/api/employees/:id/deactivate` | Admin | Deactivate |
| `PATCH` | `/api/employees/:id/reactivate` | Admin | Reactivate |

---

## Sub-Module: Role Management

### Entity: Role
```
{
  _id:         ObjectId,
  name:        String (required, unique),
  permissions: [String]
}
```
Ref: [role.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/role.model.js)

### Business Rules

#### BR-ROLE-01: Roles are Pre-Seeded
The four standard roles (Admin, Asset Manager, Department Head, Employee) should be seeded on first run. Admins can view but should not delete system roles.

#### BR-ROLE-02: List Roles
1. Return all roles
2. Used for dropdown population in employee forms

#### BR-ROLE-03: Create Custom Role (Optional/Future)
1. Accept: `name`, `permissions[]`
2. Validate `name` is unique
3. **Log Activity**: `ROLE_CREATED`

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `GET` | `/api/roles` | Admin | List all roles |
| `POST` | `/api/roles` | Admin | Create custom role (future) |

---

## Validation Schemas

### Department
```
Create: { name: z.string().min(2).max(100), description: z.string().max(500).optional(), head: z.string().optional() }
Update: same but all optional
```

### Asset Category
```
Create: { name: z.string().min(2).max(100), description: z.string().max(500).optional() }
Update: same but all optional
```

### Employee (Admin Create)
```
Create: {
  firstName:  z.string().min(2).max(50),
  lastName:   z.string().min(2).max(50),
  email:      z.string().email(),
  password:   z.string().min(8).max(128),
  department: z.string().optional(),  // ObjectId as string
  role:       z.string().optional()
}
```

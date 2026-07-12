# Module 01 — Authentication & Registration

## Overview
Handles user sign-up, login, JWT token issuance, and session management. The `Employee` model doubles as the user account.

---

## Entity: Employee (as Auth User)

> [!IMPORTANT]
> The current [employee.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/employee.model.js) is **missing** a `password` field. This must be added for authentication to work.

### Schema Additions Required
```diff
 const employeeSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
+  password: { type: String, required: true, select: false },
   department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
   role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
-  isActive: { type: Boolean, default: true }
+  isActive: { type: Boolean, default: true },
+  lastLogin: { type: Date }
 }, { timestamps: true });
```

- `password` uses `select: false` so it's excluded from queries by default
- `lastLogin` tracks when the user last authenticated

---

## Business Rules

### BR-AUTH-01: Sign-Up (Registration)
1. Accept: `firstName`, `lastName`, `email`, `password`
2. Validate email is unique (case-insensitive) → 409 Conflict if exists
3. Hash password with **bcrypt** (salt rounds: 10)
4. Assign default role = `Employee` (look up Role by name)
5. `department` is left `null` until Admin assigns one
6. Create Employee record with `isActive: true`
7. Return JWT token + user profile (no password)
8. **Log Activity**: `EMPLOYEE_REGISTERED`

### BR-AUTH-02: Login
1. Accept: `email`, `password`
2. Find Employee by email (include password field: `.select('+password')`)
3. If not found → 401 "Invalid credentials"
4. If `isActive === false` → 401 "Account deactivated"
5. Compare password with bcrypt → if mismatch → 401 "Invalid credentials"
6. Update `lastLogin` timestamp
7. Generate JWT with payload: `{ id, email, role: roleName, department }`
8. Return JWT token + user profile
9. **Log Activity**: `EMPLOYEE_LOGIN`

### BR-AUTH-03: JWT Token Structure
```json
{
  "id": "ObjectId",
  "email": "user@example.com",
  "role": "Admin|Asset Manager|Department Head|Employee",
  "department": "ObjectId|null",
  "iat": 1234567890,
  "exp": 1234567890
}
```
- Expiry: **24 hours** (configurable via `JWT_EXPIRES_IN` env var)
- Sign with `config.jwtSecret`

### BR-AUTH-04: Get Current User Profile
1. Requires valid JWT (auth middleware)
2. Return full Employee record with populated `department` and `role`
3. Exclude password

### BR-AUTH-05: Change Password
1. Requires valid JWT
2. Accept: `currentPassword`, `newPassword`
3. Verify `currentPassword` against stored hash
4. Validate `newPassword` meets strength requirements (min 8 chars, 1 uppercase, 1 number)
5. Hash and update
6. **Log Activity**: `PASSWORD_CHANGED`

---

## API Endpoints

| Method | Path | Auth | Roles | Description |
|--------|------|:----:|-------|-------------|
| `POST` | `/api/auth/register` | ❌ | Public | Create account |
| `POST` | `/api/auth/login` | ❌ | Public | Authenticate |
| `GET` | `/api/auth/me` | ✅ | All | Get current user profile |
| `PUT` | `/api/auth/change-password` | ✅ | All | Change own password |

---

## Validation Schemas (Zod)

### Register
```
{
  firstName: z.string().min(2).max(50),
  lastName:  z.string().min(2).max(50),
  email:     z.string().email(),
  password:  z.string().min(8).max(128)
}
```

### Login
```
{
  email:    z.string().email(),
  password: z.string().min(1)
}
```

### Change Password
```
{
  currentPassword: z.string().min(1),
  newPassword:     z.string().min(8).max(128)
}
```

---

## Error Cases

| Code | Message | When |
|------|---------|------|
| 400 | Validation Error | Invalid email, short password |
| 401 | Invalid credentials | Wrong email/password combo |
| 401 | Account deactivated | `isActive === false` |
| 409 | Email already registered | Duplicate email on sign-up |

---

## Dependencies Needed

> [!WARNING]
> `bcrypt` (or `bcryptjs`) is **not** in the current `package.json`. It must be installed:
> ```bash
> npm install bcryptjs
> ```

---

## Role Seeding

On first boot (or via a seed script), the system should pre-populate the `Role` collection:

| Role Name | Permissions (initial) |
|-----------|----------------------|
| Admin | `['*']` (all permissions) |
| Asset Manager | `['asset:*', 'allocation:*', 'transfer:approve', 'maintenance:approve', 'audit:perform', 'booking:*']` |
| Department Head | `['asset:read:dept', 'transfer:approve:dept', 'booking:*', 'maintenance:create']` |
| Employee | `['asset:read:own', 'booking:create', 'maintenance:create', 'transfer:request']` |

The exact permission strings are for documentation — the roles guard currently just checks role **name** against an allowed list per route.

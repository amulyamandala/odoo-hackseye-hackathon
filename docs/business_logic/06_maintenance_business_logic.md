# Module 06 — Maintenance Management

## Overview
Handles the workflow for reporting broken or faulty assets, approving the repair, logging the maintenance activity and cost, and returning the asset to service.

---

## Entity: MaintenanceRequest

```
{
  _id:              ObjectId,
  asset:            ObjectId → Asset,
  reportedBy:       ObjectId → Employee,
  issueDescription: String,
  cost:             Number,
  status:           String (default: 'Open')
}
```
Ref: [maintenanceRequest.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/maintenanceRequest.model.js)

### Schema Enhancements Recommended
```diff
 const maintenanceRequestSchema = new mongoose.Schema({
   asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
   reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
   issueDescription: { type: String, required: true },
+  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
+  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Technician
+  resolutionNotes: { type: String },
   cost: { type: Number },
   status: { type: String, default: 'Open' }
 }, { timestamps: true });
```

### Valid Status Values
Matches Kanban board in Wireframe 7:
| Status | Description |
|--------|-------------|
| `Open` / `Pending` | Issue reported, awaiting approval |
| `Approved` | Repair approved, awaiting technician assignment |
| `In Progress` | Repair work is currently underway |
| `Resolved` | Repair completed successfully |
| `Rejected` | Repair denied (e.g., deemed unnecessary) |

---

## Business Rules

#### BR-MAINT-01: Raise Maintenance Request
1. Accept: `assetId`, `issueDescription`, `priority`
2. **Context**: Any employee can raise a request for an asset they hold, or for a shared bookable asset.
3. Validate Asset exists and is not already `Decommissioned`.
4. Create MaintenanceRequest with status `Open`.
5. Update Asset `condition` to `Poor` or `Damaged` (optional, based on input).
6. Update Asset `status` to `Under Maintenance` (if it prevents usage).
   *Note: If the asset is currently Allocated, standard procedure is to end the allocation (return it) so it can be repaired, OR just flag it. For MVP: just update the asset status to `Under Maintenance`.*
7. **Log Activity**: `MAINTENANCE_REQUESTED`
8. **Notify**: Asset Manager.

#### BR-MAINT-02: Approve & Assign Technician
1. Accept: `requestId`, `assignedTo` (technician employee ID)
2. Validate Request is `Open`.
3. Update Request status to `In Progress`.
4. Update `assignedTo`.
5. **Log Activity**: `MAINTENANCE_IN_PROGRESS`
6. **Notify**: The assigned technician.

#### BR-MAINT-03: Resolve Maintenance
1. Accept: `requestId`, `resolutionNotes`, `cost`, `newCondition` (e.g., 'Good')
2. Validate Request is `In Progress`.
3. Update Request: `status = 'Resolved'`, save notes and cost.
4. Update Asset: `status = 'Available'`, `condition = newCondition`.
5. **Log Activity**: `MAINTENANCE_RESOLVED`
6. **Notify**: The employee who originally reported the issue.

#### BR-MAINT-04: Reject Maintenance
1. Accept: `requestId`, `reason`
2. Update Request: `status = 'Rejected'`, save notes.
3. Update Asset: revert `status` back to `Available` or `Allocated` (whatever it was before).
4. **Log Activity**: `MAINTENANCE_REJECTED`
5. **Notify**: Reporter.

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/maintenance` | All | Raise issue |
| `GET` | `/api/maintenance` | Admin, Asset Mgr | List board |
| `GET` | `/api/maintenance/my` | All | List own issues |
| `PATCH` | `/api/maintenance/:id/assign`| Admin, Asset Mgr | Approve & assign |
| `PATCH` | `/api/maintenance/:id/resolve`| Admin, Asset Mgr, Tech| Resolve repair |
| `PATCH` | `/api/maintenance/:id/reject`| Admin, Asset Mgr | Reject |

---

## Validation Schema

```
Create:
{
  assetId:          z.string(),
  issueDescription: z.string().min(5).max(1000),
  priority:         z.enum(['Low', 'Medium', 'High', 'Critical']).optional()
}

Resolve:
{
  resolutionNotes:  z.string().min(5),
  cost:             z.number().min(0).optional(),
  newCondition:     z.enum(['Good', 'Fair'])
}
```

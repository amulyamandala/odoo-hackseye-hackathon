# Module 07 — Asset Audits

## Overview
Periodic verification of physical assets. An Admin creates an `AuditCycle`. Auditors walk around, scan asset QR codes/barcodes, and record their condition. Missing or damaged assets are flagged as discrepancies.

---

## Entities

### AuditCycle
```
{
  _id:       ObjectId,
  name:      String,
  startDate: Date,
  endDate:   Date,
  status:    String (default: 'Planned')
}
```
Ref: [auditCycle.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/auditCycle.model.js)

### AuditRecord
```
{
  _id:        ObjectId,
  auditCycle: ObjectId → AuditCycle,
  asset:      ObjectId → Asset,
  auditedBy:  ObjectId → Employee,
  condition:  String,
  status:     String (default: 'Pending')
}
```
Ref: [auditRecord.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/auditRecord.model.js)

### Schema Enhancements Recommended
```diff
 const auditRecordSchema = new mongoose.Schema({
   auditCycle: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditCycle', required: true },
   asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
   auditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
   condition: { type: String },
-  status: { type: String, default: 'Pending' }
+  status: { type: String, enum: ['Pending', 'Verified', 'Discrepancy'], default: 'Pending' },
+  notes: { type: String }
 }, { timestamps: true });
```

---

## Business Rules

#### BR-AUDIT-01: Create Audit Cycle
1. Accept: `name`, `startDate`, `endDate`, `targetDepartments` (optional filter)
2. Validate `startDate` < `endDate`.
3. Create `AuditCycle` with status `Active` (if startDate is today) or `Planned`.
4. **Auto-Generate Records**: Find all Assets (or just those in `targetDepartments`). Create an `AuditRecord` with status `Pending` for every single asset.
5. **Log Activity**: `AUDIT_CYCLE_CREATED`

#### BR-AUDIT-02: Scan / Verify Asset (Perform Audit)
1. Accept: `auditCycleId`, `assetId` (or `qrCode`), `condition`, `notes`
2. Find the corresponding `Pending` AuditRecord.
3. **Condition Check**:
   - If `condition` is `Good` or `Fair` → update AuditRecord `status = 'Verified'`.
   - If `condition` is `Poor`, `Damaged`, or `Missing` → update AuditRecord `status = 'Discrepancy'`.
4. Update the actual Asset's `condition` to match the scan.
5. Set `auditedBy` to the current user making the request.
6. **Log Activity**: `ASSET_AUDITED`

#### BR-AUDIT-03: Handle Discrepancies
1. When an audit record is marked `Discrepancy` due to being `Missing`, the actual Asset's `status` should be updated to `Lost/Missing` (requires adding this to Asset statuses).
2. If marked `Damaged`, auto-generate a `MaintenanceRequest` suggestion.

#### BR-AUDIT-04: Close Audit Cycle
1. Accept: `auditCycleId`
2. Update AuditCycle `status = 'Completed'`.
3. Any AuditRecords that are still `Pending` (were never scanned) are automatically marked as `Discrepancy` (Reason: Not Found).
4. **Log Activity**: `AUDIT_CYCLE_COMPLETED`
5. **Notify**: Admin with a summary (X verified, Y missing, Z damaged).

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/audits` | Admin | Create cycle & records |
| `GET` | `/api/audits` | Admin, Asset Mgr | List cycles |
| `GET` | `/api/audits/:id/records` | Admin, Asset Mgr | List records for a cycle |
| `PATCH` | `/api/audits/:id/verify` | Admin, Asset Mgr | Scan/Verify asset |
| `PATCH` | `/api/audits/:id/close` | Admin | Close cycle |

---

## Validation Schema

```
Create Cycle:
{
  name:      z.string().min(2),
  startDate: z.string().datetime(),
  endDate:   z.string().datetime()
}

Verify Asset:
{
  assetId:   z.string(),
  condition: z.enum(['Good', 'Fair', 'Poor', 'Damaged', 'Missing']),
  notes:     z.string().optional()
}
```

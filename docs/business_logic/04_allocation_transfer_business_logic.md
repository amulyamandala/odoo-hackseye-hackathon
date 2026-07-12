# Module 04 — Allocation & Transfer

## Overview
This module handles assigning assets to employees, returning them, and the workflow for transferring an asset from one employee to another. It ensures strict constraint checks (e.g., an asset cannot be double-allocated).

---

## Sub-Module: Asset Allocation

### Entity: AssetAllocation
```
{
  _id:           ObjectId,
  asset:         ObjectId → Asset,
  employee:      ObjectId → Employee,
  allocatedDate: Date (default: now),
  returnDate:    Date,
  status:        String (default: 'Active')
}
```
Ref: [assetAllocation.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/assetAllocation.model.js)

### Valid Status Values
| Status | Description |
|--------|-------------|
| `Active` | Employee currently holds the asset |
| `Returned` | Asset has been returned to inventory |

### Business Rules

#### BR-ALLOC-01: Allocate Asset
1. Accept: `assetId`, `employeeId`
2. **Conflict Check**: Verify the Asset `status` is currently `Available`. If it is `Allocated`, `Under Maintenance`, `Transfer Pending`, or `Decommissioned` → 409 Conflict.
3. **Conflict Check**: Ensure there is no existing `AssetAllocation` for this asset with `status === 'Active'`.
4. Verify `employee` exists and `isActive === true`.
5. Create `AssetAllocation` record (`status: 'Active'`).
6. Update the Asset's `status` to `Allocated`.
7. **Log Activity**: `ASSET_ALLOCATED`
8. **Notify**: Send notification to the receiving employee.

#### BR-ALLOC-02: Return Asset
1. Accept: `allocationId`, `returnCondition` (optional)
2. Find the active allocation. If not found or not active → 404/400.
3. Update allocation: `status = 'Returned'`, `returnDate = new Date()`.
4. Update the Asset's `status` to `Available`.
5. If `returnCondition` is provided, update the Asset's `condition`. If `Damaged`, trigger a maintenance warning.
6. **Log Activity**: `ASSET_RETURNED`

#### BR-ALLOC-03: View Allocation History
1. Can query by `assetId` to see everyone who ever held the asset.
2. Can query by `employeeId` to see all assets currently or previously held by that employee.

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/allocations` | Admin, Asset Mgr | Allocate an asset |
| `PATCH` | `/api/allocations/:id/return` | Admin, Asset Mgr | Return an asset |
| `GET` | `/api/allocations/asset/:assetId` | Admin, Asset Mgr | History for asset |
| `GET` | `/api/allocations/employee/:empId`| Admin, Asset Mgr, (Self) | History for employee |

---

## Sub-Module: Transfer Requests

### Entity: TransferRequest
```
{
  _id:            ObjectId,
  asset:          ObjectId → Asset,
  fromEmployee:   ObjectId → Employee,
  toEmployee:     ObjectId → Employee,
  fromDepartment: ObjectId → Department,
  toDepartment:   ObjectId → Department,
  status:         String (default: 'Pending')
}
```
Ref: [transferRequest.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/transferRequest.model.js)

### Valid Status Values
| Status | Description |
|--------|-------------|
| `Pending` | Awaiting approval by Dept Head / Asset Manager |
| `Approved` | Transfer completed |
| `Rejected` | Transfer denied |

### Business Rules

#### BR-TRANS-01: Initiate Transfer Request
1. Accept: `assetId`, `toEmployeeId`
2. **Context**: Who is initiating?
   - Employee: Can only initiate if they currently hold the active allocation.
   - Admin/Asset Manager: Can initiate for any active allocation.
3. Verify the Asset `status` is `Allocated`.
4. Verify the `toEmployee` exists and `isActive === true`.
5. Determine `fromEmployee`, `fromDepartment`, and `toDepartment`.
6. **Conflict Check**: Ensure no existing `Pending` transfer request for this asset.
7. Create `TransferRequest` with `status: 'Pending'`.
8. Update Asset `status` to `Transfer Pending`.
9. **Log Activity**: `TRANSFER_REQUESTED`
10. **Notify**: Send notification to the `toDepartment` Head (or Asset Manager).

#### BR-TRANS-02: Approve Transfer
1. Accept: `transferId`
2. Validate Request is `Pending`.
3. Update TransferRequest `status = 'Approved'`.
4. **Allocation Update**:
   - Find the current `Active` allocation for `fromEmployee` and mark it `Returned`.
   - Create a NEW `Active` allocation for `toEmployee`.
5. Update Asset `status` back to `Allocated`.
6. **Log Activity**: `TRANSFER_APPROVED`
7. **Notify**: Both `fromEmployee` and `toEmployee`.

#### BR-TRANS-03: Reject Transfer
1. Accept: `transferId`, `reason`
2. Validate Request is `Pending`.
3. Update TransferRequest `status = 'Rejected'`.
4. Update Asset `status` back to `Allocated` (it stays with the original employee).
5. **Log Activity**: `TRANSFER_REJECTED`
6. **Notify**: `fromEmployee` and `toEmployee` with the rejection reason.

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/transfers` | Admin, Asset Mgr, Employee(holder) | Initiate transfer |
| `GET` | `/api/transfers` | Admin, Asset Mgr, Dept Head | List pending transfers |
| `PATCH` | `/api/transfers/:id/approve` | Admin, Asset Mgr, Dept Head | Approve transfer |
| `PATCH` | `/api/transfers/:id/reject` | Admin, Asset Mgr, Dept Head | Reject transfer |

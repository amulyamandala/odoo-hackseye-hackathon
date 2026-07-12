# Module 09 — Dashboard & Reports

## Overview
This module does not have dedicated database collections. Instead, it relies on MongoDB aggregation pipelines across existing collections (Assets, Allocations, Bookings, Maintenance) to generate the KPI metrics shown on the Dashboard and Reports screens.

---

## Business Rules & Metrics

### BR-DASH-01: Admin / Asset Manager Dashboard Metrics
Endpoint: `GET /api/reports/dashboard`

Requires returning the following aggregations:
1. **Total Assets**: Count of all Assets.
2. **Available Assets**: Count of Assets where `status === 'Available'`.
3. **Allocated Assets**: Count of active allocations (`AssetAllocation` where `status === 'Active'`).
4. **Assets Under Maintenance**: Count of Assets where `status === 'Under Maintenance'`.
5. **Pending Transfers**: Count of `TransferRequest` where `status === 'Pending'`.
6. **Recent Activity Feed**: Top 10 most recent `ActivityLog` entries.
7. **Overdue Returns**: Find all `AssetAllocation` where `returnDate < Date.now()` and `status === 'Active'`.

### BR-DASH-02: Employee Dashboard Metrics
Endpoint: `GET /api/reports/dashboard/my`

Requires returning aggregations scoped to `req.user._id`:
1. **My Current Assets**: Count/List of active allocations where `employee === req.user._id`.
2. **My Pending Transfers**: Transfers awaiting approval where `toEmployee === req.user._id` or `fromEmployee === req.user._id`.
3. **My Upcoming Bookings**: Confirmed bookings where `startDate > Date.now()` and `employee === req.user._id`.
4. **My Open Maintenance**: Maintenance requests I reported that are not `Resolved`.

### BR-REP-01: Asset Utilization by Department
Endpoint: `GET /api/reports/utilization`

**Pipeline Logic**:
1. Join `Assets` with `Departments`.
2. Group by Department.
3. Calculate Total Assets per Department.
4. Calculate Allocated Assets per Department.
5. **Utilization %** = (Allocated / Total) * 100.

### BR-REP-02: Maintenance Frequency
Endpoint: `GET /api/reports/maintenance`

**Pipeline Logic**:
1. Group `MaintenanceRequests` by `asset`.
2. Count number of requests per asset.
3. Sum the `cost` per asset.
4. Join with `Assets` to get Asset Name and Category.
5. Sort descending by count to find "Most problematic assets".

### BR-REP-03: Category Breakdown
Endpoint: `GET /api/reports/categories`

**Pipeline Logic**:
1. Group `Assets` by `category`.
2. Count total per category.
3. Breakdown status within each category (e.g., Laptops: 50 Total, 40 Allocated, 5 Available, 5 Maintenance).

---

## API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `GET` | `/api/reports/dashboard` | Admin, Asset Mgr | Global KPIs |
| `GET` | `/api/reports/dashboard/my`| All | Personal KPIs |
| `GET` | `/api/reports/utilization` | Admin, Asset Mgr | Dept usage stats |
| `GET` | `/api/reports/maintenance` | Admin, Asset Mgr | Repair cost/freq stats|
| `GET` | `/api/reports/categories` | Admin, Asset Mgr | Category breakdown |

---

## Optimization Notes
- Since these queries scan entire collections, they should utilize indexes.
- Ensure indexes exist on `status` fields across all collections.
- Ensure indexes exist on `department`, `category`, and date fields (`startDate`, `returnDate`).

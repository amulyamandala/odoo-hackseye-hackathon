# Module 05 — Resource Booking

## Overview
This module handles the temporary reservation of shared resources (e.g., conference rooms, projectors, company vehicles). Unlike long-term "allocations," bookings are time-bound to specific start and end dates/times.

---

## Entity: ResourceBooking

```
{
  _id:       ObjectId,
  asset:     ObjectId → Asset,
  employee:  ObjectId → Employee,
  startDate: Date,
  endDate:   Date,
  status:    String (default: 'Pending')
}
```
Ref: [resourceBooking.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/resourceBooking.model.js)

### Valid Status Values
| Status | Description |
|--------|-------------|
| `Pending` | Booking requested, awaiting approval (optional workflow) |
| `Confirmed` | Booking is locked in |
| `Cancelled` | Booking was cancelled by user or admin |
| `Completed` | The time slot has passed |

---

## Business Rules

#### BR-BOOK-01: Asset Eligibility
1. An asset can only be booked if its `isBookable` flag is `true`.
2. The asset's overarching `status` must be `Available`. (If it is `Decommissioned` or `Under Maintenance`, it cannot be booked).

#### BR-BOOK-02: Overlap Validation (The Core Logic)
When creating or updating a booking to a Confirmed state, the system MUST verify there are no overlapping `Confirmed` or `Pending` bookings for the same asset.
- **Formula**: A new booking `(newStart, newEnd)` overlaps with an existing booking `(existStart, existEnd)` if:
  `newStart < existEnd AND newEnd > existStart`
- If an overlap is detected → 409 Conflict with message showing the conflicting time slot.

#### BR-BOOK-03: Create Booking
1. Accept: `assetId`, `startDate`, `endDate`
2. Validate `startDate` < `endDate`.
3. Validate `startDate` is in the future.
4. Run **BR-BOOK-01** (Eligibility).
5. Run **BR-BOOK-02** (Overlap Check).
6. Create ResourceBooking (Status: `Pending` or auto-`Confirmed` based on org policy - assume auto-Confirmed for MVP unless specified).
7. If auto-confirmed, update Asset `status` to `Booked` *only during the actual time window* (this requires a cron job or dynamic getter. For MVP, we might leave Asset status as Available but block allocations if there are upcoming bookings, or implement a "Check-in/Check-out" step).
   *Simplified MVP approach*: Creating a booking leaves the Asset status as `Available`, but prevents other bookings via the overlap check.
8. **Log Activity**: `RESOURCE_BOOKED`
9. **Notify**: Send confirmation to the employee.

#### BR-BOOK-04: Cancel Booking
1. Accept: `bookingId`
2. Can only be cancelled by the employee who made it, or an Admin/Asset Manager.
3. Status must not be `Completed` or already `Cancelled`.
4. Update `status = 'Cancelled'`.
5. **Log Activity**: `BOOKING_CANCELLED`

#### BR-BOOK-05: Complete Booking (Automated/Manual)
1. Bookings whose `endDate` is in the past should transition to `Completed`.
2. This can be done via a daily cron job, or evaluated dynamically when fetching.

#### BR-BOOK-06: View Schedule
1. Accept: `assetId`, `month` (or date range)
2. Return all `Confirmed` and `Pending` bookings for the given asset in that time range.
3. This feeds the calendar view in the frontend (Screen 6).

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/api/bookings` | All | Create a booking |
| `GET` | `/api/bookings` | Admin, Asset Mgr | List all bookings |
| `GET` | `/api/bookings/my` | Employee, Dept Head | List my bookings |
| `GET` | `/api/bookings/asset/:id` | All | Get schedule for asset |
| `PATCH` | `/api/bookings/:id/cancel`| All (if owner) | Cancel booking |

---

## Validation Schema

```
Create/Update:
{
  assetId:   z.string(),
  startDate: z.string().datetime(),
  endDate:   z.string().datetime()
}
// Custom refinement: startDate < endDate
```

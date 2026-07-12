# Module 08 — Notifications & Activity Logs

## Overview
These are cross-cutting concerns. `ActivityLog` provides an immutable audit trail of who did what. `Notification` alerts users to actions requiring their attention.

---

## Entity: ActivityLog

```
{
  _id:        ObjectId,
  actor:      ObjectId → Employee,
  action:     String (required),
  entityType: String (required),
  entityId:   ObjectId (required),
  details:    Object
}
```
Ref: [activityLog.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/activityLog.model.js)

### Business Rules (Logging)
1. **Immutable**: Activity logs can only be created. They cannot be updated or deleted.
2. **Automated**: These are generated internally by services, NOT via direct API calls from the client.
3. **Retrieval**:
   - `GET /api/activity-logs`: Admin can view all.
   - `GET /api/activity-logs?entityType=Asset&entityId=123`: Fetch history for a specific entity (e.g., Asset History tab).

---

## Entity: Notification

```
{
  _id:       ObjectId,
  recipient: ObjectId → Employee,
  message:   String (required),
  isRead:    Boolean (default: false),
  type:      String
}
```
Ref: [notification.model.js](file:///c:/Users/DELL/Desktop/odoo-hackseye-hackathon/backend/src/models/notification.model.js)

### Schema Enhancements Recommended
```diff
 const notificationSchema = new mongoose.Schema({
   recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
   message: { type: String, required: true },
   isRead: { type: Boolean, default: false },
-  type: { type: String }
+  type: { type: String, enum: ['Alert', 'Approval', 'Info', 'Warning'] },
+  link: { type: String } // URL route to navigate to when clicked
 }, { timestamps: true });
```

### Business Rules (Notifications)
1. **Creation**: Generated internally by services upon key events (Transfer requested, Booking confirmed, Overdue item).
2. **Read Status**: User can mark individual notifications as read, or "Mark All as Read".
3. **Retrieval**: Users can only fetch their own notifications.

### API Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `GET` | `/api/notifications/my` | All | Get unread/all notifications |
| `PATCH` | `/api/notifications/:id/read`| All | Mark single as read |
| `PATCH` | `/api/notifications/read-all`| All | Mark all as read |
| `GET` | `/api/activity-logs` | Admin, Asset Mgr | List system logs |
| `GET` | `/api/activity-logs/:type/:id` | Admin, Asset Mgr | Get history for entity |

---

## Internal Service Method Signature (Design recommendation)

In `src/services/activity.service.js`:
```javascript
const logActivity = async (actorId, action, entityType, entityId, details = {}) => {
  return await ActivityLog.create({
    actor: actorId,
    action,
    entityType,
    entityId,
    details
  });
}
```

In `src/services/notification.service.js`:
```javascript
const sendNotification = async (recipientId, message, type = 'Info', link = null) => {
  // Can be extended later to also send Email/Slack via external APIs
  return await Notification.create({
    recipient: recipientId,
    message,
    type,
    link
  });
}
```

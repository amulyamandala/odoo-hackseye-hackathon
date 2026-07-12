# AssetFlow

**Enterprise Asset & Resource Management System**

![AssetFlow](https://img.shields.io/badge/Status-In%20Development-yellow) ![Hackathon](https://img.shields.io/badge/Event-Hackathon-blue)

---

## 🌟 Overall Vision
The vision for AssetFlow is to simplify and digitize how organizations track, allocate, and maintain their physical assets and shared resources through a centralized ERP platform. This platform is industry-agnostic—whether it's an office, school, hospital, or factory, AssetFlow works for you. 

We aim to eliminate manual tracking inefficiencies (spreadsheets, paper logs) by enabling structured asset lifecycles, centralized resource booking, and real-time visibility into *who holds what, where it is, and its condition*. AssetFlow focuses on delivering core ERP functionality with a clean architecture and scalable module design, deliberately excluding purchasing, invoicing, or accounting concerns.

## 🎯 Mission
Our mission for this hackathon is to build a user-centric, responsive application that provides staff with intuitive tools to:
- Set up departments, asset categories, and the employee directory.
- Register and track assets through their full lifecycle.
- Allocate assets to employees/departments with intelligent conflict handling.
- Book shared resources (rooms, vehicles, equipment) without overlaps.
- Run a structured maintenance approval workflow.
- Execute scheduled audit cycles to catch discrepancies.
- Receive automated notifications for overdue returns, bookings, and maintenance events.

## ⚠️ Problem Statement
Organizations struggle with tracking assets across their lifecycle. Our goal is to design and develop an Enterprise Asset & Resource Management System where organizations can:
- **Maintain** departments, asset categories, and an employee directory.
- **Track** assets through a flexible lifecycle (Available ↔ Under Maintenance, Allocated → Available, etc.).
- **Allocate** assets securely, preventing double-allocation of a single asset.
- **Book** shared/limited resources by time slot, with strict overlap validation.
- **Route** maintenance requests through an approval workflow before repair work starts.
- **Audit** assets via scheduled cycles with assigned auditors and auto-generated discrepancy reports.
- **Surface** overdue returns, bookings, and maintenance activity through notifications and KPI dashboards.

## 👥 User Roles & Permissions
AssetFlow utilizes strict Role-Based Access Control (RBAC):

1. **Admin**: Manages departments, asset categories, audit cycles, and employee/role assignments. Views organization-wide analytics.
2. **Asset Manager**: Registers/allocates assets, approves transfers/maintenance/audit discrepancies, and processes condition check-ins.
3. **Department Head**: Views department assets, approves internal allocations/transfers, and books shared resources on behalf of the department.
4. **Employee**: Views their allocated assets, books shared resources, raises maintenance requests, and initiates return/transfer requests.

## ✨ Core Features
- **Organization Setup**: Master data management for Departments, Categories, and Employees.
- **Asset Registration**: Centralized directory with QR code/Tag tracking, lifecycles, and history.
- **Allocation & Transfer**: Explicit conflict rules (blocking double allocations) and transfer request workflows.
- **Resource Booking**: Calendar-view time-slot booking for shared resources with overlap validation.
- **Maintenance Management**: Prioritized repair requests, approvals, and technician assignment.
- **Asset Audits**: Structured verification cycles with auto-generated discrepancy reports.
- **Reports & Analytics**: Asset utilization trends, maintenance frequency, and departmental summaries.
- **Activity Logs**: Full system audit trail of who did what and when.

## 🔗 Resources
- **Mockup (POC)**: [Excalidraw Link](https://app.excalidraw.com/l/65VNwvy7c4X/5ceOBMjbDby)
- **System Design**: [Backend System Architecture](./backend/SYSTEM_DESIGN.md)

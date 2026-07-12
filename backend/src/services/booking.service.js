const { ResourceBooking, Asset, Employee } = require("../models");
const { Op } = require("sequelize");

class BookingService {
  async createBooking(data, employeeId) {
    const { assetId, startTime, endTime, purpose } = data;

    // 1. Validate times
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      throw new Error("End time must be after start time");
    }

    // 2. Validate asset is bookable and active
    const asset = await Asset.findByPk(assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }

    // In our Sequelize setup, `isBookable` might need to be added to Asset model if not present.
    // For now we check if it is explicitly marked false (if the field exists) or if it's decommissioned.
    if (asset.isBookable === false) {
      throw new Error("This asset is not available for booking");
    }
    if (asset.status === "Decommissioned") {
      throw new Error("Cannot book a decommissioned asset");
    }

    // 3. Overlap Detection Logic
    // A booking overlaps if:
    // (newStart < existingEnd) AND (newEnd > existingStart)
    const overlappingBookings = await ResourceBooking.findAll({
      where: {
        assetId: assetId,
        status: {
          [Op.in]: ["Pending", "Approved", "Active"],
        },
        startTime: {
          [Op.lt]: end, // newStart < existingEnd is handled by endTime > start, see below
        },
        endTime: {
          [Op.gt]: start,
        },
      },
    });

    if (overlappingBookings.length > 0) {
      throw new Error("Asset is already booked during this time period");
    }

    // 4. Create booking
    const booking = await ResourceBooking.create({
      assetId,
      employeeId,
      startTime: start,
      endTime: end,
      purpose,
      status: "Pending", // Could auto-approve depending on business rules
    });

    return booking;
  }

  async getBookings(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.assetId) where.assetId = filters.assetId;
    if (filters.employeeId) where.employeeId = filters.employeeId;

    return await ResourceBooking.findAll({
      where,
      include: [{ model: Asset }, { model: Employee }],
      order: [["startTime", "DESC"]],
    });
  }

  async getMyBookings(employeeId) {
    return await this.getBookings({ employeeId });
  }

  async getBookingByAsset(assetId) {
    return await this.getBookings({ assetId });
  }

  async cancelBooking(bookingId, employeeId) {
    const booking = await ResourceBooking.findByPk(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.employeeId !== employeeId) {
      throw new Error("Unauthorized to cancel this booking");
    }

    if (["Completed", "Cancelled"].includes(booking.status)) {
      throw new Error(`Cannot cancel a booking in status: ${booking.status}`);
    }

    await booking.update({ status: "Cancelled" });
    return booking;
  }
}

module.exports = new BookingService();

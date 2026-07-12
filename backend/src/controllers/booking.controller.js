const bookingService = require("../services/booking.service");

exports.createBooking = async (req, res, next) => {
  try {
    // Assuming auth middleware sets req.user.id
    const employeeId = req.user.id;
    const booking = await bookingService.createBooking(req.body, employeeId);
    res.status(201).json({ message: "Booking created", data: booking });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookings(req.query);
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const employeeId = req.user.id;
    const bookings = await bookingService.getMyBookings(employeeId);
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

exports.getBookingByAsset = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingByAsset(req.params.id);
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const employeeId = req.user.id;
    const booking = await bookingService.cancelBooking(
      req.params.id,
      employeeId,
    );
    res.status(200).json({ message: "Booking cancelled", data: booking });
  } catch (error) {
    next(error);
  }
};

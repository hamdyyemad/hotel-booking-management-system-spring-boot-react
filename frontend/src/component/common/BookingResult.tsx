import React from "react";
import { Link } from "react-router-dom";
import { Booking } from "../../types";

interface BookingResultProps {
  bookingSearchResults: Booking[];
}

const BookingResult: React.FC<BookingResultProps> = ({
  bookingSearchResults,
}) => {
  return (
    <div className="booking-results">
      {bookingSearchResults.map((booking) => (
        <div key={booking.id} className="booking-result-item">
          <p>Room ID: {booking.roomId}</p>
          <p>User ID: {booking.userId}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          <p>Status: {booking.status}</p>
          <Link to={`/admin/edit-booking/${booking.id}`} className="edit-link">
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookingResult;

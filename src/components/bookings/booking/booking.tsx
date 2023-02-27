import { IBookingProps } from "../../interface/interface";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { deleteBooking } from "../../../store/booking/actions";
import Spinner from "../../spinner/spinner";

export default function Booking({ card }: IBookingProps) {
  const dispatch = useAppDispatch();
  const [currentId, setCurrentId] = useState("");
  const { id, totalPrice, guests, date, trip } = card;
  return (
    <li data-test-id="booking" className="booking">
      {id === currentId ? (
        <Spinner />
      ) : (
        <>
          <h3 data-test-id="booking-title" className="booking__title">
            {trip.title}
          </h3>
          <span data-test-id="booking-guests" className="booking__guests">
            {guests} guests
          </span>
          <span data-test-id="booking-date" className="booking__date">
            {date.substr(0, 10)}
          </span>
          <span data-test-id="booking-total" className="booking__total">
            {totalPrice} $
          </span>
          <button
            onClick={() => {
              dispatch(deleteBooking(id));
              setCurrentId(id);
            }}
            data-test-id="booking-cancel"
            className="booking__cancel"
            title="Cancel booking"
          >
            <span className="visually-hidden">Cancel booking</span>×
          </button>
        </>
      )}
    </li>
  );
}

import { IRootState } from "../../store/rootStateInterface";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { getBookingsData } from "../../store/booking/actions";
import Notification from "../notification/notification";
import SignIn from "../sign-in/sign-in";
import Booking from "./booking/booking";
import Spinner from "../spinner/spinner";

export default function Bookings() {
  const dispatch = useAppDispatch();
  const { presenceOfToken } = useAppSelector((state: IRootState) => state.auth);
  const { bookingsData, loadingData, messageDelete } = useAppSelector(
    (state: IRootState) => state.bookings
  );
  useEffect(() => {
    dispatch(getBookingsData());
  }, []);
  if (!presenceOfToken) {
    return <SignIn />;
  }

  const bookingCard = bookingsData.map((card) => (
    <Booking key={card.id} card={card} />
  ));

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      {loadingData ? (
        <Spinner />
      ) : (
        <ul className="bookings__list">{bookingCard}</ul>
      )}
      {bookingsData.length === 0 ? (
        <h1 style={{ textAlign: "center", fontSize: "60px", color: "#747474" }}>
          No bookings found
        </h1>
      ) : null}
      <Notification message={messageDelete} />
    </main>
  );
}

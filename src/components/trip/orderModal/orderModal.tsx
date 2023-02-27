import { IRootState } from "../../../store/rootStateInterface";
import { IOrderModalProps } from "../../interface/interface";
import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { postBooking } from "../../../store/booking/actions";
import Spinner from "../../spinner/spinner";

export default function OrderModal({
  setModalActive,
  active,
  dataTripsId,
}: IOrderModalProps) {
  const dispatch = useAppDispatch();
  const { id, title, level, duration, price } = dataTripsId;
  const [valueDateForm, setValueDateForm] = useState("");
  const [valueGuestsForm, setValueGuestsForm] = useState(1);
  const { userData } = useAppSelector((state: IRootState) => state.auth);
  const { loadingData } = useAppSelector((state: IRootState) => state.bookings);

  const data = {
    tripId: id,
    userId: userData.id,
    guests: valueGuestsForm,
    date: valueDateForm,
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValueDateForm("");
    setValueGuestsForm(1);
    dispatch(postBooking(data));
  };

  const closeBtn = () => {
    setModalActive(false);
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fullDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + (day) : day
  }`;
  console.log(fullDate)
  const classActive = active ? "" : "display-none";

  return (
    <div className={classActive}>
      <div data-modal="modal" className="modal">
        <div data-test-id="book-trip-popup" className="book-trip-popup">
          <button
            data-modal="modal2"
            data-test-id="book-trip-popup-close"
            className="book-trip-popup__close"
            onClick={closeBtn}
          >
            ×
          </button>
          {loadingData ? (
            <Spinner />
          ) : (
            <form
              onSubmit={onSubmit}
              className="book-trip-popup__form"
              autoComplete="off"
            >
              <div className="trip-info">
                <h3
                  data-test-id="book-trip-popup-title"
                  className="trip-info__title"
                >
                  {title}
                </h3>
                <div className="trip-info__content">
                  <span
                    data-test-id="book-trip-popup-duration"
                    className="trip-info__duration"
                  >
                    <strong>{duration}</strong> days
                  </span>
                  <span
                    data-test-id="book-trip-popup-level"
                    className="trip-info__level"
                  >
                    {level}
                  </span>
                </div>
              </div>
              <label className="input">
                <span className="input__heading">Date</span>
                <input
                  onChange={(e) => setValueDateForm(e.target.value)}
                  data-test-id="book-trip-popup-date"
                  name="date"
                  type="date"
                  min={fullDate}
                  required
                  value={valueDateForm}
                />
              </label>
              <label className="input">
                <span className="input__heading">Number of guests</span>
                <input
                  onChange={(e) => setValueGuestsForm(+e.target.value)}
                  data-test-id="book-trip-popup-guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={valueGuestsForm}
                  required
                />
              </label>
              <span className="book-trip-popup__total">
                Total:
                <output
                  data-test-id="book-trip-popup-total-value"
                  className="book-trip-popup__total-value"
                >
                  {price * valueGuestsForm} $
                </output>
              </span>
              <button
                data-test-id="book-trip-popup-submit"
                className="button"
                type="submit"
              >
                Book a trip
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

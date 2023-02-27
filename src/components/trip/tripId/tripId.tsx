import { useParams } from "react-router-dom";
import { IRootState } from "../../../store/rootStateInterface";
import { ITripIdProps } from "../../interface/interface";
import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getTripsDataId } from "../../../store/tripsData/action";
import OrderModal from "../orderModal/orderModal";
import Spinner from "../../spinner/spinner";
import Notification from "../../notification/notification";

export default function TripId() {
  const { idTrip } = useParams();
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const { tripsDataId, loadingData } = useAppSelector((state) => state.trips);
  const messagePost = useAppSelector((state) => state.bookings.messagePost);
  const loadingDataBooking = useAppSelector((state: IRootState) => state.bookings.loadingData);

  useMemo(() => {
    if (!loadingDataBooking) {
      setModalActive(false);
    }
  }, [loadingDataBooking]);

  useEffect(() => {
    if (!idTrip) {
      return;
    }
    dispatch(getTripsDataId(idTrip));
  }, []);

  const { id, createdAt, title, level, duration, price, image, description } =
    tripsDataId as ITripIdProps;

  return (
    <main className="trip-page">
      {loadingData ? (
        <Spinner />
      ) : (
        <>
          <h1 className="visually-hidden">Travel App</h1>
          <div className="trip">
            <img
              data-test-id="trip-details-image"
              src={image}
              className="trip__img"
              alt="trip image"
            />
            <div className="trip__content">
              <div className="trip-info">
                <h3
                  data-test-id="trip-details-title"
                  className="trip-info__title"
                >
                  {title}
                </h3>
                <div className="trip-info__content">
                  <span
                    data-test-id="trip-details-duration"
                    className="trip-info__duration"
                  >
                    <strong>{duration}</strong> days
                  </span>
                  <span
                    data-test-id="trip-details-level"
                    className="trip-info__level"
                  >
                    {level}
                  </span>
                </div>
              </div>
              <div
                data-test-id="trip-details-description"
                className="trip__description"
              >
                {description}
              </div>
              <div className="trip-price">
                <span>Price</span>
                <strong
                  data-test-id="trip-details-price-value"
                  className="trip-price__value"
                >
                  {price} $
                </strong>
              </div>
              <button
                data-test-id="trip-details-button"
                className="trip__button button"
                onClick={() => setModalActive((state) => !state)}
              >
                Book a trip
              </button>
            </div>
          </div>
        </>
      )}
      <OrderModal
        setModalActive={setModalActive}
        active={modalActive}
        dataTripsId={{
          id,
          createdAt,
          title,
          level,
          duration,
          price,
          image,
          description,
        }}
      />
      <Notification message={messagePost} />
    </main>
  );
}

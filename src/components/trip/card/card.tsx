import { Link } from "react-router-dom";
import { ITripPropsData } from "../../interface/interface";
export default function Card({ cardItem }: ITripPropsData) {
  const { id, title, level, duration, price, image } = cardItem;

  return (
    <li data-test-id="trip-card" className="trip-card">
      <img data-test-id="trip-card-image" src={image} alt="trip image" />
      <div className="trip-card__content">
        <div className="trip-info">
          <h3 data-test-id="trip-card-title" className="trip-info__title">
            {title}
          </h3>
          <div className="trip-info__content">
            <span
              data-test-id="trip-card-duration"
              className="trip-info__duration"
            >
              <strong>{duration}</strong> days
            </span>
            <span data-test-id="trip-card-level" className="trip-info__level">
              {level}
            </span>
          </div>
        </div>
        <div className="trip-price">
          <span>Price</span>
          <strong
            data-test-id="trip-card-price-value"
            className="trip-price__value"
          >
            {price} $
          </strong>
        </div>
      </div>
      <Link to={`/trip/${id}`} data-test-id="trip-card-link" className="button">
        Discover a trip
      </Link>
    </li>
  );
}

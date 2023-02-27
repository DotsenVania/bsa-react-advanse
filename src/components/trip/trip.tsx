import Card from "./card/card";
import { ITripsPropsData } from "../interface/interface";
import { useAppSelector } from "../../hooks/reduxHooks";
import Spinner from "../spinner/spinner";

export default function Trip({ dataTravel }: ITripsPropsData) {
  const { loadingData } = useAppSelector((state) => state.trips);

  const cardTravel = dataTravel.map((card) => (
    <Card key={card.id} cardItem={card} />
  ));

  const cardTravelContend =
    cardTravel.length !== 0 && loadingData === false ? cardTravel : null;

  const notFound =
    cardTravel.length === 0 && !loadingData ? (
      <h1 style={{ textAlign: "center", fontSize: "80px", color: "#747474" }}>
        Not Found
      </h1>
    ) : null;

  const spinner = loadingData ? <Spinner /> : null;

  return (
    <section className="trips">
      <h2 className="visually-hidden">Trips List</h2>
      {notFound}
      {spinner}
      <ul className="trip-list">{cardTravelContend}</ul>
    </section>
  );
}

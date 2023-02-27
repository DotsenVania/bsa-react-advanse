import { IDataTravel } from "../interface/interface";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import Trip from "../trip/trip";
import Filters from "./filters/filters";
import SignIn from "../sign-in/sign-in";

export default function Main() {
  const [trim, setTrim] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const { presenceOfToken } = useAppSelector((state) => state.auth);
  const { tripsData } = useAppSelector((state) => state.trips);

  if (!presenceOfToken) {
    return <SignIn />;
  }

  const searchAndFiler = (
    data: IDataTravel[],
    trim: string,
    duration: string,
    level: string
  ) => {
    const newDataFilterSearch = data.filter(
      (item) => item.title.toLowerCase().indexOf(trim.toLowerCase()) !== -1
    );

    const newDataFilterDuration = newDataFilterSearch.filter((item) => {
      switch (duration) {
        case "0_x_5":
          return item.duration < 5;
        case "5_x_10":
          return item.duration > 5 && item.duration < 10;
        case "10_x":
          return item.duration >= 10;
        default:
          return item.duration;
      }
    });

    const newDataFilterLevel = newDataFilterDuration.filter((item) => {
      switch (level) {
        case "easy":
          return item.level === "easy";
        case "moderate":
          return item.level === "moderate";
        case "difficult":
          return item.level === "difficult";
        default:
          return item.level;
      }
    });

    return newDataFilterLevel;
  };

  const updateTrim = (trim: string, duration: string, level: string): void => {
    setTrim(trim);
    setDuration(duration);
    setLevel(level);
  };

  return (
    <main>
      <Filters updateTrim={updateTrim} />
      <Trip dataTravel={searchAndFiler(tripsData, trim, duration, level)} />
    </main>
  );
}

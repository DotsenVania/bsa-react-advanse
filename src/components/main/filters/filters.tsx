import { IPropsFilter } from "../../interface/interface";
import { useState, useEffect } from "react";

export default function Filters({ updateTrim }: IPropsFilter) {
  const [searchValue, setSearchValue] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [levelValue, setLevelValue] = useState("");

  useEffect(() => {
    updateTrim(searchValue, durationValue, levelValue);
  }, [searchValue, durationValue, levelValue]);

  const onChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const dataTestId = e.target.getAttribute("data-test-id");

    switch (dataTestId) {
      case "filter-search":
        setSearchValue(e.target.value);
        break;
      case "filter-duration":
        setDurationValue(e.target.value);
        break;
      case "filter-level":
        setLevelValue(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <section className="trips-filter">
      <h2 className="visually-hidden">Trips filter</h2>
      <form className="trips-filter__form" autoComplete="off">
        <label className="trips-filter__search input">
          <span className="visually-hidden">Search by name</span>
          <input
            onChange={onChangeSearch}
            value={searchValue}
            data-test-id="filter-search"
            name="search"
            type="search"
            placeholder="search by title"
          />
        </label>
        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select
            onChange={onChangeSearch}
            value={durationValue}
            data-test-id="filter-duration"
            name="duration"
          >
            <option value="">duration</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10_x">&ge; 10 days</option>
          </select>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select
            onChange={onChangeSearch}
            value={levelValue}
            data-test-id="filter-level"
            name="level"
          >
            <option value="">level</option>
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
      </form>
    </section>
  );
}

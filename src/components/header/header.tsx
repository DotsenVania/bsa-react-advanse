import { Link, useLocation } from "react-router-dom";
import { IUserData } from "../interface/interface";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { changeToken, clearError } from "../../store/auth/actions";
import user from "../../assets/images/user.svg";
import briefcase from "../../assets/images/briefcase.svg";

export default function Header() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  const { fullName } = userData as IUserData;
  let active = true;

  switch (pathname) {
    case "/sign-in":
      active = false;
      break;
    case "/sign-up":
      active = false;
      break;

    default:
      active = true;
      break;
  }

  const out = () => {
    dispatch(changeToken({ status: false }));
    dispatch(clearError());
    localStorage.removeItem("travelAppApiToken");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to={"/"} className="header__logo">
          Travel App
        </Link>
        <nav data-test-id="header-nav" className="header__nav">
          <ul
            style={active ? { display: "flex" } : { display: "none" }}
            className="nav-header__list"
          >
            <li className="nav-header__item" title="Bookings">
              <Link
                data-test-id="header-bookings-link"
                to={"/bookings"}
                className="nav-header__inner"
              >
                <span className="visually-hidden">Bookings</span>
                <img src={briefcase} alt=" icon" />
              </Link>
            </li>
            <li className="nav-header__item" title="Profile">
              <div
                data-test-id="header-profile-nav"
                className="nav-header__inner profile-nav"
                tabIndex={0}
              >
                <span className="visually-hidden">Profile</span>
                <img src={user} alt="profile icon" />
                <ul
                  data-test-id="header-profile-nav-list"
                  className="profile-nav__list"
                >
                  <li
                    data-test-id="header-profile-nav-username"
                    className="profile-nav__item profile-nav__username"
                  >
                    {fullName}
                  </li>
                  <li className="profile-nav__item">
                    <Link
                      onClick={out}
                      data-test-id="header-profile-nav-sign-out"
                      to={"/sign-in"}
                      className="profile-nav__sign-out button"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks/reduxHooks";
import { changeToken } from "./store/auth/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { getTripsData } from "./store/tripsData/action";
import { userData } from "./store/auth/actions";

export default function useTokenVerification() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { presenceOfToken } = useAppSelector((state) => state.auth);
  const tokenSearch = localStorage.getItem("travelAppApiToken");

  useEffect(() => {
    if (tokenSearch) {
      dispatch(changeToken({ status: true }));
      dispatch(getTripsData(tokenSearch));
      dispatch(userData());
    } else {
      dispatch(changeToken({ status: false }));
    }
    if (!presenceOfToken) {
      if (pathname !== "/sign-in" && pathname !== "/sign-up") {
        return navigate("/sign-in");
      }
    }
  }, [presenceOfToken, pathname]);

  
}

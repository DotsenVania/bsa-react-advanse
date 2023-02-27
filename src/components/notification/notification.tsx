import { useAppDispatch } from "../../hooks/reduxHooks";
import { useState, useEffect} from "react";
import { clearMessage } from "../../store/booking/actions";
import iconOk from "../../assets/images/ok.png";

interface IPropsNotification {
  message: string;
}
export default function Notification({ message }: IPropsNotification) {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (message !== "") {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        dispatch(clearMessage());
      }, 1000);
    }
  }, [message]);

  const style = active ? "active" : null;

  return (
    <div className={`wrapper__notification ${style}`}>
      <img src={iconOk} alt="" />
      <div className="message"> {message}</div>
    </div>
  );
}

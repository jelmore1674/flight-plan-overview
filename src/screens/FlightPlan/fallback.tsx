import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateFlightPlan} from "../../store/slices/simbrief";
import { fetchFlightPlan } from "./utils";
import styles from "./styles.module.css";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

export default function FlightPlan() {
  const { username } = useAppSelector((state) => ({
    ...state.simbrief,
    ...state.settings
  }));
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const getPlan = async () => {
    setLoading(true);
    if (username) {
      try {
        const data = await fetchFlightPlan(username);
        dispatch(updateFlightPlan({ flightPlan: data }));
      } catch (error) {
        console.log({ error });
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <button type="button" onClick={getPlan}>
          Fetch Plan
        </button>
      </div>
      {loading && (
        <div className={styles.center}>
          <FaSpinner className={styles.rotate} />
        </div>
      )}
    </div>
  );
}

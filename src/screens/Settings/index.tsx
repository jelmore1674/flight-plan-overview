import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateHasFlightFactor } from "../../store/slices/settings";
import { updateUsername } from "../../store/slices/simbrief";
import { resetApp } from "../../utils";
import styles from "./styles.module.css";

export default function Settings() {
  const { hasFlightFactor, username } = useAppSelector((state) => ({
    username: state.simbrief.username,
    hasFlightFactor: state.settings.hasFlightFactor
  }));
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(username);
  const [hasFF, setHasFF] = useState(hasFlightFactor);

  const saveUsername = () => {
    dispatch(updateHasFlightFactor({ hasFlightFactor: hasFF }));
    dispatch(updateUsername({ username: value }));
  };

  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <div>
        <label>Simbrief Username</label>
        <input
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </div>
      <div>
        <label>Do you have Flight Factor Aircraft?</label>
        <input
          type="checkbox"
          onChange={() => {
            setHasFF((p) => !p);
          }}
          checked={hasFF}
        />
      </div>
      <div>
        <button type="button" onClick={saveUsername}>
          Save
        </button>
      </div>
      <div>
        <button type="button" onClick={resetApp}>
          Reset App
        </button>
      </div>
    </div>
  );
}

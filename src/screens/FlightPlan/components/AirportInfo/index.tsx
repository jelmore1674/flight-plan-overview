import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRoad,
  FaTriangleExclamation
} from "react-icons/fa6";
import { Airport, AlternateAirport } from "../../../../types/simbrief";
import styles from "./styles.module.css";

const ICONS = {
  departure: FaPlaneDeparture,
  arrival: FaPlaneArrival,
  alternate: FaTriangleExclamation
};

interface Props {
  type: "departure" | "arrival" | "alternate";
  airport: Airport | AlternateAirport;
}

export function AirportInfo({ type, airport }: Props) {
  const Icon = ICONS[type];
  return (
    <div className={`${styles.airportWrapper} ${styles[type]}`}>
      <div className={styles.innerWrapper}>
        <div className={styles.airportLabelWrapper}>
          <Icon />
          <p>{airport.icao_code}</p>
        </div>
        <div className={styles.runwayWrapper}>
          <FaRoad />
          <p>{airport.plan_rwy}</p>
        </div>
      </div>
      <p className={styles.elevation}>{airport.elevation} ft</p>
    </div>
  );
}

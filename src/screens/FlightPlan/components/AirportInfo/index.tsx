import { FaRoad } from "react-icons/fa6";
import { Airport, AlternateAirport } from "../../../../types/simbrief";
import styles from "./styles.module.css";

interface Props {
  label: string;
  airport: Airport | AlternateAirport;
}

export function AirportInfo({ label, airport }: Props) {
  return (
    <div className={`${styles.airportWrapper}`}>
      <h2 className={`${styles.airportLabel}`}>{label}</h2>
      <div>{airport.icao_code}</div>
      <div
        style={{
          height: 48,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 8
        }}
      >
        <FaRoad size="32" />
        <div style={{ fontSize: 32 }}>{airport.plan_rwy}</div>
      </div>
      <div>{airport.metar}</div>
      <div>{airport.elevation} ft</div>
    </div>
  );
};

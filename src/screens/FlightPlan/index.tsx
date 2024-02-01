import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateFlightPlan, updateUsername } from "../../store/slices/simbrief";
import {
  CARGO_AIRLINES,
  calculateWeightDistribution,
  fetchFlightPlan,
  sanitizeWeights,
  FlightFactorAircraft
} from "./utils";
import { AirportInfo, InfoBox } from "./components";
import styles from "./styles.module.css";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { invoke } from "@tauri-apps/api";

interface WeightProps {
  totalCargo: number;
  totalPallets: number;
  zfw: number;
}
function WeightBox({ zfw, totalCargo, totalPallets }: WeightProps) {
  return (
    <div>
      <h2>Pallets: {totalPallets}</h2>
      <h2>Cargo: {totalCargo}</h2>
      <h2>ZFW: {zfw}</h2>
    </div>
  );
}

export default function FlightPlan() {
  const { flightPlan, username, hasFlightFactor } = useAppSelector((state) => ({
    ...state.simbrief,
    ...state.settings
  }));
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
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

  flightPlan.atc = null;

  const saveUsername = () => {
    dispatch(updateUsername({ username: value }));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <button type="button" onClick={getPlan}>
          Fetch Plan
        </button>
      </div>
      <div>
        {loading ? (
          <div className={styles.center}>
            <FaSpinner className={styles.rotate} />
          </div>
        ) : flightPlan ? (
          <div className={styles.flightPlanWrapper}>
            <div className={styles.airportInfoWrapper}>
              <AirportInfo type="departure" airport={flightPlan.origin} />
              <AirportInfo type="arrival" airport={flightPlan.destination} />
              <AirportInfo type="alternate" airport={flightPlan.alternate} />
            </div>
            <div className={styles.detailsWrapper}>
              <InfoBox
                label="Callsign"
                text={flightPlan?.atc?.callsign ?? ""}
              />
              <InfoBox label="Aircraft" text={flightPlan?.aircraft?.icao_code ?? ""} />
              <InfoBox
                label="Distance"
                text={flightPlan?.general?.route_distance ?? ""}
                unit={"NM"}
              />
              <InfoBox
                label="ZFW"
                text={sanitizeWeights(flightPlan?.weights.est_zfw)}
                unit={flightPlan?.params?.units ?? ""}
              />
              <InfoBox
                label="Block Fuel"
                text={sanitizeWeights(flightPlan?.fuel.plan_ramp)}
                unit={flightPlan?.params.units}
              />
              {!CARGO_AIRLINES.includes(flightPlan?.general?.icao_airline) && (
                <InfoBox
                  label="Passengers"
                  text={flightPlan?.weights.pax_count}
                />
              )}
              <InfoBox
                label="Payload"
                text={sanitizeWeights(flightPlan?.weights.payload)}
                unit={flightPlan?.params.units}
              />
              <InfoBox
                label="ETOW"
                text={sanitizeWeights(flightPlan?.weights.est_tow)}
                unit={flightPlan?.params.units}
              />
              <InfoBox
                label="Altitude"
                text={flightPlan?.general.initial_altitude}
              />
              <InfoBox
                label="CI / Cruise"
                text={`${flightPlan?.general.costindex} / ${flightPlan?.general.cruise_mach}`}
              />
              <InfoBox
                label="Cruise Wind"
                text={`${flightPlan?.general.avg_wind_dir}/${flightPlan?.general.avg_wind_spd}`}
              />
              <InfoBox
                label="Isa Dev."
                text={flightPlan?.general.avg_temp_dev}
                unit="°"
                temp={true}
              />
              <InfoBox label="Route" text={flightPlan?.general.route} />
              {hasFlightFactor &&
                FlightFactorAircraft.includes(
                  flightPlan?.aircraft.base_type
                ) && (
                  <div style={{ width: "100%" }}>
                    <h2>Weights</h2>
                    <WeightBox
                      {...calculateWeightDistribution(
                        parseInt(flightPlan?.weights.payload),
                        flightPlan?.aircraft.base_type as "B752" | "B763"
                      )}
                    />
                  </div>
                )}
            </div>
          </div>
        ) : (
          !username && (
            <div>
              <label>Simbrief Username</label>
              <input
                type="text"
                value={value}
                onChange={({ target }) => setValue(target.value)}
              />
              <button type="button" onClick={saveUsername}>
                Save Username
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateFlightPlan } from "../../store/slices/simbrief";
import {
  CARGO_AIRLINES,
  calculateWeightDistribution,
  fetchFlightPlan,
  sanitizeWeights,
  FlightFactorAircraft
} from "./utils";
import { AirportInfo, InfoBox } from "./components";
import styles from "./styles.module.css";

interface WeightProps {
  totalCargo: number;
  totalPallets: number;
}
function WeightBox({ totalCargo, totalPallets }: WeightProps) {
  return (
    <div>
      <h2>Pallets: {totalPallets}</h2>
      <h2>Cargo: {totalCargo}</h2>
    </div>
  );
}

export default function FlightPlan() {
  const { flightPlan, username, hasFlightFactor } = useAppSelector((state) => ({
    ...state.simbrief,
    ...state.settings
  }));
  const dispatch = useAppDispatch();

  const getPlan = async () => {
    if (username) {
      const data = await fetchFlightPlan(username);
      dispatch(updateFlightPlan({ flightPlan: data }));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1>Flight Plan</h1>
      <div>
        <button type="button" onClick={getPlan}>
          Fetch Plan
        </button>
      </div>
      {flightPlan && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 16,
            flexWrap: "nowrap"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: 8
            }}
          >
            <AirportInfo label="Departure" airport={flightPlan.origin} />
            <AirportInfo label="Arrival" airport={flightPlan.destination} />
            <AirportInfo label="Alternate" airport={flightPlan.alternate} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 16,
              flexWrap: "wrap"
            }}
          >
            <InfoBox label="Callsign" text={flightPlan.atc.callsign} />
            <InfoBox
              label="Distance"
              text={flightPlan.general.route_distance}
              unit={"NM"}
            />
            {!CARGO_AIRLINES.includes(flightPlan.general.icao_airline) && (
              <InfoBox label="Passengers" text={flightPlan.weights.pax_count} />
            )}
            <InfoBox
              label="Payload"
              text={sanitizeWeights(flightPlan.weights.payload)}
              unit={flightPlan.params.units}
            />
            <InfoBox
              label="Block Fuel"
              text={sanitizeWeights(flightPlan.fuel.plan_ramp)}
              unit={flightPlan.params.units}
            />
            <InfoBox
              label="CI / Cruise"
              text={`${flightPlan.general.costindex} / ${flightPlan.general.cruise_mach}`}
            />
            <InfoBox
              label="ZFW"
              text={sanitizeWeights(flightPlan.weights.est_zfw)}
              unit={flightPlan.params.units}
            />
            <InfoBox
              label="ETOW"
              text={sanitizeWeights(flightPlan.weights.est_tow)}
              unit={flightPlan.params.units}
            />
            <InfoBox
              label="Isa Dev."
              text={flightPlan.general.avg_temp_dev}
              unit="°"
            />
            <InfoBox label="Aircraft" text={flightPlan.aircraft.icao_code} />
            <InfoBox
              label="Cruise Wind"
              text={`${flightPlan.general.avg_wind_dir}/${flightPlan.general.avg_wind_spd}`}
            />
            <InfoBox
              label="Altitude"
              text={flightPlan.general.initial_altitude}
            />
            <InfoBox label="Airline" text={flightPlan.general.icao_airline} />
            <InfoBox label="Route" text={flightPlan.general.route} />
            {hasFlightFactor &&
              FlightFactorAircraft.includes(flightPlan.aircraft.base_type) && (
                <div style={{ width: "100%" }}>
                  <h2>Weights</h2>
                  <WeightBox
                    {...calculateWeightDistribution(
                      parseInt(flightPlan.weights.payload),
                      flightPlan.aircraft.base_type as "B752" | "B763"
                    )}
                  />
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

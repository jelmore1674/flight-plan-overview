import { SimbriefData } from "../../types/simbrief";

interface Aircraft {
  /**
   * the empty weight of the aircraft
   */
  emptyWeight: number;
  /**
   * max cargo in the underbelly of aircraft
   */
  maxCargo: number;
  /**
   * total number of pallets to load in aircraft
   */
  pallets: number;
  /**
   * weight of each pallet
   */
  weight: number;
}

interface FlightFactorAircraft {
  /**
   * Boeing 757F
   */
  B752: Aircraft;
  /**
   * Boeing 767F
   */
  B763: Aircraft;
}

/**
 * The base weights of the Flight Factor 757F/767F variants.
 */
const AIRCRAFT: FlightFactorAircraft = {
  B752: {
    emptyWeight: 117500,
    maxCargo: 35000,
    pallets: 15,
    weight: 3840
  },
  B763: {
    emptyWeight: 198000,
    maxCargo: 99999,
    pallets: 13,
    weight: 9800
  }
};

export const FlightFactorAircraft = Object.keys(AIRCRAFT).map((key) => key);

/**
 * List of known cargo airlines
 */
export const CARGO_AIRLINES = [
  // FedEx
  "FDX",
  // United Parcel Service
  "UPS",
  // Atlas Air
  "GTI"
];

export function createPalletWeights(
  { pallets, weight, maxCargo }: Aircraft,
  payload: number
) {
  const totalPallets = [];

  // Loop though all pallet combinations and set the weights.
  for (let i = 1; i <= pallets; i++) {
    // Total weight of all the pallets
    const totalWeight = i * weight;

    // get the weight that will go in the underbelly.
    const cargo = payload - totalWeight;

    if (cargo > 0 && cargo < maxCargo) {
      totalPallets.push({ pallets: i, weight: totalWeight, cargo });
    }
  }
  return totalPallets;
}

export function calculateWeightDistribution(
  payload: number,
  icao: "B752" | "B763"
) {
  // Create pallets and get the most even weight between pallets and cargo
  const newPallets = createPalletWeights(AIRCRAFT[icao], payload).reduce(
    (acc, pal) => {
      // If there is no weight dump the first one in the accumilator
      if (acc.cargo === 0) {
        return pal;
      }

      // get the weight difference between the two weights.
      const prevDiff = Math.abs(acc.weight - acc.cargo);
      const currentDiff = Math.abs(pal.weight - acc.cargo);

      if (prevDiff > currentDiff) {
        return pal;
      }

      return acc;
    },
    { cargo: 0, pallets: 0, weight: 0 }
  );

  // Get the ZFW of the aircraf for FF Aircraft.
  const zfw = AIRCRAFT[icao].emptyWeight + payload;

  return {
    zfw,
    totalPallets: newPallets.pallets,
    totalCargo: newPallets.cargo
  };
}

/**
 * Fetch the latest flight plan from simbrief
 * @param {string} username the username of the flight plan you are gettings
 * @returns {SimbriefData}
 */
export async function fetchFlightPlan(username: string): Promise<SimbriefData> {
  const res = await fetch(
    `https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`
  );
  const data: SimbriefData = await res.json();
  return data;
}

/**
 * Prettify numbers to there are commas added `10,000`
 * @param {string} weight - the weight of the aircraft
 * @return {string} weight with commas added if needed.
 */
export function sanitizeWeights(weight: string): string {
  return weight.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";
import { Input, Output } from "./components";
import { Container } from "./components/Container";

const MINIMUM_WEIGHT = 198000;
const PALLET_WEIGHT = 9800;

async function fetchFlightPlan(username: string) {
  const res = await fetch(
    `https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`
  );
  const data = await res.json();
  const filteredData = {
    aircraft: {
      icaoCode: data.aircraft.icao_code
    },
    plan: {
      origin: data.origin.icao_code
    }
  };
  console.log({ data, filteredData });
  return data;
}

function App() {
  const [zfwValue, setZfwValue] = useState(0);
  const [payload, setPayload] = useState<string | number>(0);
  const [pallets, setPallets] = useState<string | number>(0);
  const [cargo, setCargo] = useState<string | number>(0);
  const [simbriefUsername, setSimbriefUsername] = useState("");
  const [vatsim, setVatsim] = useState("");

  const handleFlightPlan = async () => {
    const data = await fetchFlightPlan(simbriefUsername);
    console.log({ test: data });
    setVatsim(data.vatsim_prefile);
  };

  const calculateWeightDistribution = () => {
    let payloadTest;
    if (typeof payload === "number") {
      payloadTest = payload;
    } else {
      payloadTest = parseFloat(payload);
    }

    const totalPayload = payloadTest.toString().includes(".")
      ? payloadTest * 1000
      : payloadTest;
    // take payload and divide by pallets and round down.
    const totalPallets = Math.floor(totalPayload / PALLET_WEIGHT);

    const zfw = MINIMUM_WEIGHT + totalPayload;
    const palletWeight = totalPallets * PALLET_WEIGHT;
    const totalCargo = totalPayload - palletWeight;

    setCargo(totalCargo);
    setPallets(totalPallets);
    setZfwValue(zfw);
  };

  return (
    <Container>
      <div>
        <Container>
          <>
            <Input
              label="Simbrief Username"
              value={simbriefUsername}
              onChange={setSimbriefUsername}
              type="text"
            />
            <button
              type="button"
              style={{ alignSelf: "flex-start" }}
              onClick={handleFlightPlan}
            >
              Fetch Flight Plan
            </button>
            <Container>
              {vatsim && <a dangerouslySetInnerHTML={{ __html: vatsim }} />}
            </Container>
          </>
        </Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: 600
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <Input
              label="Payload"
              onChange={setPayload}
              type="number"
              value={payload}
            />
          </div>
        </div>
        <button onClick={calculateWeightDistribution} type="button">
          Calculate
        </button>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          {pallets !== 0 && <Output label="Pallets" value={pallets} />}
          {cargo !== 0 && <Output label="Cargo" value={cargo} />}
          {zfwValue !== 0 && <Output label="ZFW" value={zfwValue} />}
        </div>
      </div>
    </Container>
  );
}

export default App;

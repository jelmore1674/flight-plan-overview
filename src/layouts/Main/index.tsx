import { getVersion } from "@tauri-apps/api/app";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { routes } from "../../routes";

export function MainLayout() {
  const [currentVersion, setCurrentVersion] = useState("");

  useEffect(() => {
    getVersion().then((version) => {
      setCurrentVersion(version);
    });
  }, []);

  return (
    <div>
      <p style={{ position: "absolute", top: -10, left: 10 }}>{currentVersion}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <Link to={routes.FLIGHT_PLAN}>Flight Plan</Link>
        {/* <Link to={routes.CHECKLIST}>Checklist</Link> */}
        <Link to={routes.SETTINGS}>Settings</Link>
      </div>
      <Outlet />
    </div>
  );
}

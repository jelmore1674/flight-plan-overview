import { Link, Outlet } from "react-router-dom";
import { routes } from "../../routes";

export function MainLayout() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <Link to={routes.FLIGHT_PLAN}>Flight Plan</Link>
        <Link to={routes.CHECKLIST}>Checklist</Link>
        <Link to={routes.SETTINGS}>Settings</Link>
      </div>
      <Outlet />
    </div>
  );
}

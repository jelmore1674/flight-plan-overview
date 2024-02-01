import App from "../App";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { MainLayout } from "../layouts/Main";
import { Checklist, FlightPlan, Settings } from "../screens";

export const routes = {
  CHECKLIST: "/checklist",
  FLIGHT_PLAN: "/",
  HOME: "/",
  SETTINGS: "/settings"
};

export default createBrowserRouter([
  {
    path: routes.HOME,
    element: <MainLayout />,
    children: [
      {
        path: routes.FLIGHT_PLAN,
        element: <FlightPlan />
      },
      {
        path: routes.CHECKLIST,
        element: <Checklist />
      },
      {
        path: routes.SETTINGS,
        element: <Settings />
      }
    ]
  }
]);

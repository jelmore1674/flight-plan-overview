import App from "../App";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { MainLayout } from "../layouts/Main";
import { Checklist, FlightPlan, Settings } from "../screens";

export const routes = {
  HOME: "/",
  CHECKLIST: "/checklist",
  FLIGHT_PLAN: "/",
  SETTINGS: "/settings"
};

export default createBrowserRouter([
  {
    path: routes.HOME,
    element: <MainLayout />,
    children: [
      {
        path: routes.FLIGHT_PLAN,
        element: (
          <FlightPlan />
          // <div>
          //   <h1>Hello world!</h1>
          //   <img
          //     src="https://www.simbrief.com/ofp/uads/KPHLKRFD_1706164424_ROUTE.gif"
          //     alt="blah"
          //   />
          //   <Link to="/test">Test</Link>
          // </div>
        )
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
  },
  {
    path: "test",
    element: <App />
  }
]);

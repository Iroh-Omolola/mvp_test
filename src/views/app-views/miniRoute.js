import { Route, useRoutes } from "react-router-dom";
import "antd/dist/antd.min.css";
import Report from "./Dashboard/report";

const MiniRoutes = ({
  projectName,
  payloadData,
  gatewayName,
  gatewayId,
  projectId,
  setLoading,
  miniPayload,
  setProjectName,
  setGatewayName,
  setPayloadData,
}) => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Report
          projectName={projectName}
          payloadData={payloadData}
          gatewayName={gatewayName}
          gatewayId={gatewayId}
          setPayloadData={setPayloadData}
          projectId={projectId}
          setLoading={setLoading}
          miniPayload={miniPayload}
          setProjectName={setProjectName}
          setGatewayName={setGatewayName}
        />
      ),
    },
  ]);

  return routes;
};

export default MiniRoutes;

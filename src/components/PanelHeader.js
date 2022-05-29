import React from "react";
import "../css/panel.css";

const PanelHeader = ({ project, total }) => {
  return (
    <div className="panel-header">
      <div className="panel-content">
        <div className="panel-project">
          <h4>{project}</h4>
        </div>
        <div className="panel-total">
          {" "}
          <h4>{total}</h4>
        </div>
      </div>
    </div>
  );
};
export default PanelHeader;

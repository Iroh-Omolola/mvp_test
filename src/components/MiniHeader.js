import { Button, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import "../css/mini-header.css";
import PropTypes from "prop-types";
import { fetchGateways, fetchProjects } from "../redux/actions";
import connect from "react-redux/es/connect/connect";

const MiniHeader = ({
  setProjectName,
  setGatewayName,
  fetchGateways,
  fetchProjects,
  projects_data,
  gateway_data,
  setProjectId,
  setGatewayId,
  projectId,
  gatewayId,
  setPayloadData,
  setMiniPayload,
  gatewayName,
  projectName,
  isLoading,
}) => {
  const { Option } = Select;
  const [from, setFrom] = useState("");
  const [tempFrom, setTempFrom] = useState("");
  const [to, setTo] = useState("");
  const [tempTo, setTempTo] = useState("");
  const [tempProjectId, setTempProjectId] = useState("");
  const [tempGatewayId, setTempGatewayId] = useState("");
  const [tempHeader, setTempHeader] = useState("");
  const [tempHeaderOne, setTempHeaderOne] = useState("");

  useEffect(() => {
    fetchGateways();
    fetchProjects();
  }, []);

  useEffect(() => {
    const payload = {
      from,
      to,
      projectId,
      gatewayId,
    };
    setMiniPayload(payload);
  }, []);

  const onGenerate = () => {
    const payload = {
      from: tempFrom,
      to: tempTo,
      projectId: tempProjectId,
      gatewayId: tempGatewayId,
    };
    setPayloadData(payload);
    setProjectName(tempHeader);
    setGatewayName(tempHeaderOne);
  };

  const onChangeToDate = (date, dateString) => {
    setTo(dateString);
    setTempTo(dateString);
  };
  const onChangeFromDate = (date, dateString) => {
    setFrom(dateString);
    setTempFrom(dateString);
  };
  const onProject = (value, id) => {
    setProjectId(id.id);
    setTempHeader(value);
    setTempProjectId(id.id);
  };
  const onGateway = (value, id) => {
    setGatewayId(id.id);
    setTempGatewayId(id.id);
    setTempHeaderOne(value);
  };

  return (
    <div className="mini-header-container">
      <div className="mini-header-content">
        <h3>Reports</h3>
        <p>Easily generate a report of your transactions</p>
      </div>
      <div className="mini-header-buttons">
        <div className="one-btn">
          <Select placeholder="Select project" onChange={onProject}>
            <Option value={"All Projects"} id={""}>
              All Projects
            </Option>

            {projects_data && projects_data.length > 0
              ? projects_data?.map((data) => (
                  <Option value={data?.name} id={data?.projectId}>
                    {data?.name}
                  </Option>
                ))
              : ""}
          </Select>
        </div>
        <div className="one-btn">
          <Select placeholder="Select gateway" onChange={onGateway}>
            <Option value={"All Gateways"} id={""}>
              All Gateways
            </Option>
            {gateway_data && gateway_data.length > 0
              ? gateway_data?.map((data) => (
                  <Option value={data?.name} id={data?.gatewayId}>
                    {data?.name}
                  </Option>
                ))
              : ""}
          </Select>
        </div>
        <div className="one-btn">
          <DatePicker placeholder="From date" onChange={onChangeFromDate} />
        </div>
        <div className="one-btn">
          <DatePicker placeholder="To date" onChange={onChangeToDate} />
        </div>
        <Button className="one-btn" disabled={isLoading} onClick={onGenerate}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

const propsTypes = {
  isFetching: PropTypes.bool,
};

const defaultProps = {
  isFetching: false,
};
MiniHeader.propTypes = propsTypes;
MiniHeader.defaultProps = defaultProps;

const stateProps = (state) => ({
  isFetching: state.ui.loading.fetchGateways || state.ui.loading.fetchProjects,
  projects_data: state.report?.project,
  gateway_data: state.report?.gateway,
  error: state.ui.errors.fetchGateways || state.ui.errors.fetchProjects,
});

const dispatchProps = {
  fetchGateways,
  fetchProjects,
};

export default connect(stateProps, dispatchProps)(MiniHeader);

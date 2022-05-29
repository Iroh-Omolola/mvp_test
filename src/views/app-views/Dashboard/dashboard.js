import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "../../../css/app-view.css";
import { CgMenuLeftAlt } from "react-icons/cg";
import MiniRoutes from "../miniRoute";
import { Link } from "react-router-dom";
import MiniHeader from "../../../components/MiniHeader";
import Footer from "../../../components/Footer";
import PropTypes from "prop-types";
import { fetchUsers } from "../../../redux/actions";
import connect from "react-redux/es/connect/connect";

const { Header, Sider } = Layout;

const Dashboard = ({ fetchUsers, users, isFetching }) => {
  const [state, setState] = useState({
    collapsed: true,
  });
  const [projectId, setProjectId] = useState("");
  const [payloadData, setPayloadData] = useState("");
  const [miniPayload, setMiniPayload] = useState("");
  const [gatewayId, setGatewayId] = useState("");
  const [projectName, setProjectName] = useState("All Projects");
  const [gatewayName, setGatewayName] = useState("All Gateways");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  useEffect(() => {
    setFirstName(users?.[0]?.firstName);
    setLastName(users?.[0]?.lastName);
  }, [users]);
  const letter = `${firstName}  ${lastName}`;
 /**
  * It takes a string, splits it into an array of words, maps over the array to get the first letter of
  * each word, and joins the letters back into a string
  * @param str - The string to be split into words and then joined back together.
  * @returns The first letter of each word in the string.
  */
  function getFirstLetters(str) {
    const firstLetters = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstLetters;
  }
  useEffect(() => {
    setAvatar(getFirstLetters(letter));
  }, [letter]);

  return (
    <Layout className="layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        className="sider-menu"
      >
        <div className="logo">
          <object
            data="/assets/images/b-color 1.svg"
            className="logo-img"
            aria-label="icon-one"
            type="image/svg+xml"
          />
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={
              <object
                id="svg1"
                data="/assets/images/Layer 7.svg"
                aria-label="icon-one"
                type="image/svg+xml"
                className="icon-name"
              />
            }
          >
            <Link to="/"></Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={
              <object
                id="svg1"
                data="/assets/images/Layer 3.svg"
                aria-label="icon-one"
                type="image/svg+xml"
                className="icon-name"
              />
            }
          >
            <Link to="/"></Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={
              <object
                id="svg1"
                data="/assets/images/Layer 4.svg"
                aria-label="icon-one"
                type="image/svg+xml"
                className="icon-name"
              />
            }
          >
            <Link to="/"></Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={
              <object
                id="svg1"
                data="/assets/images/Layer 1 (1).svg"
                aria-label="icon-one"
                type="image/svg+xml"
                className="icon-name"
              />
            }
          >
            <Link to="/">Reports</Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={
              <object
                id="svg1"
                data="/assets/images/Layer 6.svg"
                aria-label="icon-one"
                type="image/svg+xml"
                className="icon-name"
              />
            }
          >
            <Link to="/"></Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background-header">
          <div className="layout-header-mini-container">
            {React.createElement(
              state.collapsed ? CgMenuLeftAlt : CgMenuLeftAlt,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}

            <div className="notification-user-container">
              <div className="user-name-avatar">
                <p>{avatar}</p>
              </div>
              <div className="user-name-text">
                <p>{`${users?.[0]?.firstName} ${users?.[0]?.lastName} `}</p>
              </div>
            </div>
          </div>
        </Header>
        <div className="container-content">
          <MiniHeader
            setProjectName={setProjectName}
            setGatewayName={setGatewayName}
            setProjectId={setProjectId}
            setGatewayId={setGatewayId}
            setPayloadData={setPayloadData}
            setMiniPayload={setMiniPayload}
            projectId={projectId}
            gatewayId={gatewayId}
            projectName={projectName}
            payloadData={payloadData}
            gatewayName={gatewayName}
            isLoading={loading}
          />
          <div className="mini-content">
            <MiniRoutes
              setProjectName={setProjectName}
              setGatewayName={setGatewayName}
              projectName={projectName}
              gatewayName={gatewayName}
              projectId={projectId}
              gatewayId={gatewayId}
              setPayloadData={setPayloadData}
              payloadData={payloadData}
              miniPayload={miniPayload}
              setLoading={setLoading}
            />
          </div>
        </div>
        <Footer />
      </Layout>
    </Layout>
  );
};

const propsTypes = {
  isFetching: PropTypes.bool,
};

const defaultProps = {
  isFetching: false,
};
Dashboard.propTypes = propsTypes;
Dashboard.defaultProps = defaultProps;

const stateProps = (state) => ({
  isFetching: state.ui.loading.fetchUsers,
  users: state.report?.users,
  error: state.ui.errors.fetchUsers,
});

const dispatchProps = {
  fetchUsers,
};

export default connect(stateProps, dispatchProps)(Dashboard);

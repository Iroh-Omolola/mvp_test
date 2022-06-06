import React, { useEffect } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Table } from "antd";
import "../../../css/report.css";
import PanelHeader from "../../../components/PanelHeader";
import PropTypes from "prop-types";
import moment from "moment";
import Loader from "../../../components/Loader";
import {
  postReport,
  fetchProjects,
  fetchGateways,
} from "../../../redux/actions";
import { connect } from "react-redux";
import ReportOne from "./reportOne";
import ReportGraphContainer from "./graphShow";
import NoContent from "./noContent";
const { Panel } = Collapse;

const Report = ({
  projectName,
  postReport,
  fetchProjects,
  gatewayName,
  payloadData,
  report_data,
  projects_data,
  isLoading,
  setLoading,
  miniPayload,
  fetchGateways,
  gateway_data,
}) => {
  let totalAmount = 0;
  let totalSum = 0;
  let reportOneTotal = 0;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Gateway",
      dataIndex: "gateway",
      key: "gateway",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  useEffect(() => {
    postReport(payloadData);
    setLoading(isLoading);
  }, [payloadData, postReport]);

  useEffect(() => {
    postReport(miniPayload);
  }, [miniPayload, postReport]);

  useEffect(() => {
    fetchProjects();
    fetchGateways();
  }, []);

  // To get the individual amount and total amount
  const calculateAmountFromReports = function (reports) {
    return (
      reports &&
      reports.length > 0 &&
      reports?.reduce(function (acc, obj) {
        return +obj.amount + +acc;
      }, 0)
    );
  };

  const computeTotalSum = function (collections) {
    if (!(collections instanceof Object)) return;

    if (collections instanceof Array) {
      return collections.reduce(function (acc, obj) {
        return +acc + calculateAmountFromReports(obj.reports);
      }, 0);
    }
    return calculateAmountFromReports(collections.reports);
  };

  // ============SORT==DATE======================================
  const sortReportsByDate = function (reports) {
    return (
      reports &&
      reports.length > 0 &&
      reports.sort((a, b) => {
        if (a.created < b.created) return -1;
        if (a.created > b.created) return 1;
        return 0;
      })
    );
  };
  // ==================================================

  
  // PROJECT(S) WITH GATEWAY--Showing GatewayName

  const getAllProjectsAndAllGateways = function () {
    return (
      projects_data &&
      projects_data.length > 0 &&
      projects_data.map((project) => {
        const reports =
          report_data &&
          report_data.length > 0 &&
          report_data
            .filter((d) => project.projectId === d.projectId)
            .map((report) => {
              const { name: gatewayName } =
                gateway_data &&
                gateway_data.length > 0 &&
                gateway_data.find(
                  (gateway) => gateway.gatewayId === report.gatewayId
                );
              return { ...report, gatewayName };
            });
        sortReportsByDate(reports);
        return { ...project, reports };
      })
    );
  };

  const projectReports = getAllProjectsAndAllGateways();

  // GATEWAY(S) WITH PROJECT--Showing ProjectName
  const getAllGatewaysAndAllProjects = function () {
    return (
      gateway_data &&
      gateway_data.length > 0 &&
      gateway_data.map((gateway) => {
        const reports =
          report_data &&
          report_data.length > 0 &&
          report_data
            .filter((d) => d.gatewayId === gateway.gatewayId)
            .map((report) => {
              const { name: projectName } = projects_data.find(
                (p) => p.projectId === report.projectId
              );
              return { ...report, projectName };
            });
        sortReportsByDate(reports);

        return { ...gateway, reports };
      })
    );
  };
  const allTheProject = getAllGatewaysAndAllProjects();

  //  specific project and all gateways
  const getSpecificProjectAndAllGateways = function (projectId) {
    return (
      projectReports?.length > 0 &&
      projectReports?.find((p) => p.projectId === projectId)
    );
  };

  const getspecificandAll = getSpecificProjectAndAllGateways(
    payloadData?.projectId
  );

  const getOneProjectandAllGateways =
    gateway_data &&
    gateway_data.length > 0 &&
    gateway_data.map((project) => {
      const reports =
        getspecificandAll?.reports &&
        getspecificandAll?.reports.length > 0 &&
        getspecificandAll?.reports?.filter(
          (d) => project.gatewayId === d.gatewayId
        );
      sortReportsByDate(reports);

      return { ...project, reports };
    });

  // specific project and specific gateway
  const getSpecificProjectAndSpecificGateway = function (projectId, getwayId) {
    const selectedProject = getSpecificProjectAndAllGateways(projectId);
    if (selectedProject) {
      sortReportsByDate(selectedProject.reports);
      selectedProject.reports =
        selectedProject?.reports &&
        selectedProject?.reports.length > 0 &&
        selectedProject?.reports?.filter(
          (report) => report.gatewayId === getwayId
        );
    }

    return selectedProject;
  };
  const myOne = getSpecificProjectAndSpecificGateway(
    payloadData?.projectId,
    payloadData?.gatewayId
  );

  const getSpecificGatewayAndAllProjects = function (gatewayId) {
    return (
      allTheProject &&
      allTheProject.length > 0 &&
      allTheProject.find((gateway) => gateway.gatewayId === gatewayId)
    );
  };
  const result = getSpecificGatewayAndAllProjects(payloadData?.gatewayId);

  const getOneGatewayandAllProject =
    projects_data &&
    projects_data.length > 0 &&
    projects_data.map((project) => {
      const reports =
        result?.reports &&
        result?.reports.length > 0 &&
        result?.reports?.filter((d) => project.projectId === d.projectId);
      return { ...project, reports };
    });

  // Table data

  const dataSource =
    myOne?.reports &&
    myOne?.reports.length > 0 &&
    myOne?.reports?.map((data, index) => {
      reportOneTotal = reportOneTotal + data?.amount;

      return {
        key: index + 1,
        date: moment(data?.created).format("DD.MM.YYYY"),
        transactionId: data?.paymentId,
        amount: `${data?.amount.toLocaleString()} USD`,
      };
    });

  const allGatewayOne = report_data?.map((data, index) => {
    reportOneTotal = reportOneTotal + data?.amount;

    return {
      key: index + 1,
      date: moment(data?.created).format("DD.MM.YYYY"),
      transactionId: data?.paymentId,
      amount: `${data?.amount} USD`,
    };
  });

  return (
    <>
      {
        /* Show This content page when the report result is not empty and the project name is  All projects and the gatwayName is All Gateways  */
        projectName === "All Projects" &&
          gatewayName === "All Gateways" &&
          report_data &&
          report_data.length > 0 && (
            <div className="main-report-header">
              {report_data && report_data.length > 0 && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="mini-report-head">
                        <h6>
                          {projectName} | {gatewayName}
                        </h6>

                        <div className="main-report-container">
                          <Collapse
                            bordered={false}
                            defaultActiveKey={["1"]}
                            expandIcon={({ isActive }) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                            )}
                            className="site-collapse-custom-collapse"
                          >
                            {projectReports &&
                              projectReports.length > 0 &&
                              projectReports?.map((data, index) => (
                                <>
                                  <Panel
                                    header={
                                      <PanelHeader
                                        project={data.name}
                                        total={`TOTAL: ${(() => {
                                          const total = computeTotalSum(data);
                                          return Math.round(total);
                                        })().toLocaleString()}
                              USD`}
                                      />
                                    }
                                    key={index + 1}
                                    className="site-collapse-custom-panel"
                                    showArrow={false}
                                  >
                                    <Table
                                      dataSource={
                                        data.reports &&
                                        data.reports.length > 0 &&
                                        data.reports?.map(
                                          (reportData, index) => ({
                                            key: index + 1,
                                            date: moment(
                                              reportData?.created
                                            ).format("DD.MM.YYYY"),
                                            transactionId:
                                              reportData?.paymentId,
                                            gateway: reportData?.gatewayName,
                                            amount: `${reportData?.amount.toLocaleString()} USD`,
                                          })
                                        )
                                      }
                                      columns={columns}
                                      pagination={false}
                                    />
                                  </Panel>
                                </>
                              ))}
                          </Collapse>
                        </div>
                      </div>
                      <div className="total-amount">
                        <h3>{`TOTAL: ${Math.round(
                          computeTotalSum(projectReports)
                        ).toLocaleString()} USD`}</h3>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )
      }
      {
        /* Show This content page when the report result is not empty and the project name is not All projects and the gatwayName is not All Gateways  */
        projectName !== "All Projects" &&
          gatewayName !== "All Gateways" &&
          report_data &&
          report_data.length > 0 && (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {report_data &&
                    payloadData !== "" &&
                    report_data.length > 0 && (
                      <ReportOne
                        projectName={projectName}
                        gatewayName={gatewayName}
                        dataSource={dataSource}
                        totalAmount={`TOTAL: ${Math.round(
                          computeTotalSum(myOne)
                        ).toLocaleString()} USD`}
                      />
                    )}
                </>
              )}
            </>
          )
      }
      {
        /* Show This content page when the report result is not empty and the gatewayname name is not All gateways while the projectname is All Projects  */
        projectName === "All Projects" &&
          gatewayName !== "All Gateways" &&
          report_data &&
          report_data.length > 0 && (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {report_data && report_data.length > 0 && (
                    <ReportGraphContainer
                      projectName={projectName}
                      gatewayName={gatewayName}
                      projectNumber={result?.name}
                      computeTotalSum={computeTotalSum}
                      projectReports={getOneGatewayandAllProject}
                    />
                  )}
                </>
              )}
            </>
          )
      }
      {
        /* Show This content page when the report result is not empty and the project name is not All project while the gatwayName is All Gateways  */
        projectName !== "All Projects" &&
          gatewayName === "All Gateways" &&
          report_data &&
          report_data.length > 0 && (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {report_data && report_data.length > 0 && (
                    <ReportGraphContainer
                      projectName={projectName}
                      gatewayName={gatewayName}
                      dataSource={allGatewayOne}
                      computeTotalSum={computeTotalSum}
                      projectReports={getOneProjectandAllGateways}
                    />
                  )}
                </>
              )}
            </>
          )
      }
      {
        /* Show No content page when the report result is empty  */
        <>
          {report_data && report_data.length === 0 && (
            <NoContent isLoading={isLoading} />
          )}
        </>
      }
    </>
  );
};

const propsTypes = {
  isSubmitting: PropTypes.bool,
};

const defaultProps = {
  isSubmitting: false,
};
Report.propTypes = propsTypes;
Report.defaultProps = defaultProps;

const stateProps = (state) => ({
  isSubmitting:
    state.ui.loading.fetchGateways || state.ui.loading.fetchProjects,
  isLoading: state.ui.loading.postReport,
  report_data: state.report?.report,
  projects_data: state.report?.project,
  gateway_data: state.report?.gateway,
  error: state.ui.errors.fetchGateways || state.ui.errors.fetchProjects,
});

const dispatchProps = {
  postReport,
  fetchProjects,
  fetchGateways,
};

export default connect(stateProps, dispatchProps)(Report);

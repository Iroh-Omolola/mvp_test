import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Table } from "antd";
import React, { useEffect, useState } from "react";
// import {css} from '@emotion/css'
import { PieChart } from "react-minimal-pie-chart";
import moment from "moment";
import PanelHeader from "../../../components/PanelHeader";
import "../../../css/graph.css";

const ReportGraphContainer = ({
  projectName,
  gatewayName,
  projectNumber,
  totalNumber,
  projectReports,
}) => {
  const [revealCount, setRevealCount] = useState(0);
  let totalAmount = 0;
  let totalSum = 0;
  useEffect(() => {
    let timer = setInterval(() => {
      setRevealCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
        } else {
          return prev + 1;
        }
      });
    }, 1);

    return () => clearInterval(timer);
  }, []);
  const { Panel } = Collapse;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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

  const data = {
    //   labels: ["Project 1", "Project 2"],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  return (
    <>
      <div className="graph-show-main-container">
        <div className="table-mini-page-container">
          <div className="main-report-header">
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
                                data.reports &&
                                  data.reports?.map(
                                    ({ amount }) =>
                                      (totalAmount =
                                        totalAmount + Number(amount))
                                  );
                                return Math.round(totalAmount);
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
                              data.reports?.map((reportData, index) => ({
                                key: index + 1,
                                date: moment(reportData?.created).format("L"),
                                transactionId: reportData?.paymentId,
                                amount: `${reportData?.amount.toLocaleString()} USD`,
                              }))
                            }
                            columns={columns}
                            pagination={false}
                          />
                        </Panel>
                        {(() => {
                          totalSum = totalSum + totalAmount;
                        })()}
                      </>
                    ))}
                </Collapse>
              </div>
            </div>
          </div>
        </div>
        <div className="graph-mini-page-container">
          <div className={`graph-details`}>
            <div className="box-container">
              <span className="box"></span>
              <p>{projectNumber}</p>
            </div>
          </div>
          <div className="chart-graph">
            <PieChart
              data={[{ title: "One", value: totalAmount, color: "#E38627" }]}
              reveal={revealCount}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              lineWidth={50}
              labelStyle={{
                fontSize: "5px",
                fontFamily: "sans-serif",
                fill: "#fff",
                opacity: 0.75,
                pointerEvents: "none",
              }}
              style={{ height: "300px" }}
              labelPosition={70}
            />
          </div>
          <div className="graph-details total-footer">
            <h3>{`${Math.round(totalSum).toLocaleString()} USD`}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportGraphContainer;

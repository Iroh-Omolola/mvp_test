import React from "react";
import { Table } from "antd";
import "../../../css/report.css";

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
const ReportOne = ({ projectName, gatewayName, dataSource, totalAmount }) => {
  return (
    <div className="main-report-header">
      <div className="mini-report-head">
        <h6>
          {projectName} | {gatewayName}
        </h6>

        <div className="main-report-container">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className="report-one-table"
          />
        </div>
      </div>
      <div className="total-amount">
        <h3>{totalAmount}</h3>
      </div>
    </div>
  );
};
export default ReportOne;

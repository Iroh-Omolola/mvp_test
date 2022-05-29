import React from "react";
import Loader from "../../../components/Loader";
import "../../../css/nocontent.css";
const NoContent = ({ isLoading, data }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-container">
          <div className="empty-content">
            <h3>No reports</h3>
            <p>
              Currently you have no data for the reports to be generated. Once
              you start generating traffic through the Balance application the
              reports will be shown.
            </p>
            <img src="/assets/images/nocontent.svg" alt="" />
          </div>
        </div>
      )}
    </>
  );
};
export default NoContent;

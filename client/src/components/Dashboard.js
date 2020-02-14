import React, { Fragment } from "react";
import { fetchData } from "../redux/action/data";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

const Dashboard = ({ fetchData, data: { data } }) => {
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Fragment>
      {data.map(post => (
        <div key={post.id}>
          <Typography>{post.title}</Typography>
        </div>
      ))}
    </Fragment>
  );
};
const mapStateToMap = state => {
  return {
    data: state.data
  };
};
export default connect(mapStateToMap, { fetchData })(Dashboard);

import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Alerts = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      return (
        <Fragment>
          <div className={classes.root}>
            <Alert variant="filled" severity={alert.alertType}>
              {alert.msg}
            </Alert>
          </div>
        </Fragment>
      );
    })
  );
};
const mapStateToProps = state => ({
  alerts: state.alerts
});
export default connect(mapStateToProps)(Alerts);

import React, { Fragment } from "react";
import validate from "validate.js";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { alertSet } from "../../redux/action/alert";
import PropTypes from "prop-types";
import { login } from "../../redux/action/auth";
import { Redirect } from "react-router-dom";

const useStyle = makeStyles(theme => ({
  paper: {
    padding: "5%"
  },
  button: {
    paddingLeft: "35%"
  }
}));
const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 30
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "is required"
    },
    length: {
      maximum: 20
    }
  }
};
const Login = ({ alertSet, login, isAuthenticated }) => {
  const classes = useStyle();
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  React.useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      values: { ...formState.values, [e.target.name]: e.target.value },
      touched: { ...formState.touched, [e.target.name]: true }
    }));
  };
  const handleSubmit = () => {
    login(formState.values);
  };
  if (isAuthenticated) {
    alertSet("You have login successfully", "success");
    return <Redirect to="/dashboard" />;
  }
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const { email, password } = formState.values;

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="primary" align="center">
              LOGIN
            </Typography>
            <form>
              <TextField
                required
                onChange={handleChange}
                label="Email"
                margin="normal"
                variant="outlined"
                autoFocus
                value={email || ""}
                error={hasError("email")}
                helperText={
                  hasError("email") ? formState.errors.email[0] : null
                }
                fullWidth
                name="email"
              />
              <TextField
                required
                onChange={handleChange}
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                helperText={
                  hasError("password") ? formState.errors.password[0] : null
                }
                fullWidth
                error={hasError("password")}
                name="password"
                value={password || ""}
              />
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!formState.isValid}
                >
                  SUBMIT
                </Button>
              </div>
            </form>
            <br />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};
Login.propTypes = {
  alertSet: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStapToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStapToProps, { alertSet, login })(Login);

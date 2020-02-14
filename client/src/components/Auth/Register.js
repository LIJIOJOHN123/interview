import React, { Fragment } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import validate from "validate.js";
import { connect } from "react-redux";
import { alertSet } from "../../redux/action/alert";
import PropTypes from "prop-types";
import { register } from "../../redux/action/auth";
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
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 30
    }
  },
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
      maximum: 20,
      minimum: 6,
      tooShort: "needs to have %{count} words or more"
    }
  }
};

const Register = ({ alertSet, register, isAuthenticated }) => {
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
  const handleSubmit = async () => {
    await register(formState.values);
    alertSet("You have sucessfully registered", "success");
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const { name, email, password } = formState.values;

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="primary" align="center">
              Register
            </Typography>
            <form>
              <TextField
                error={hasError("name")}
                fullWidth
                helperText={hasError("name") ? formState.errors.name[0] : null}
                label="Name"
                name="name"
                onChange={handleChange}
                type="text"
                value={name || ""}
                variant="outlined"
                autoFocus
              />
              <TextField
                required
                error={hasError("email")}
                name="email"
                helperText={
                  hasError("email") ? formState.errors.email[0] : null
                }
                label="Email"
                margin="normal"
                onChange={handleChange}
                value={email || ""}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                label="Password"
                name="password"
                helperText={
                  hasError("password") ? formState.errors.password[0] : null
                }
                error={hasError("password")}
                onChange={handleChange}
                value={password || ""}
                type="password"
                margin="normal"
                variant="outlined"
                fullWidth
              />

              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!formState.isValid}
                  onClick={handleSubmit}
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
Register.propTypes = {
  alertSet: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { alertSet, register })(Register);

import React, { Fragment } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Toolbar, Typography, Button, AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "5%"
  },
  button: {
    textDecoration: "none",
    color: "white"
  },
  toolbar: {
    background: "black"
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",

    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    backgroundColor: "white",
    borderRadius: 20
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

const DesktopMenu = (
  { auth: { loading, isAuthenticated, name, user }, logout },
  props
) => {
  const classes = useStyles();
  const guestLSection = (
    <div>
      <Button color="inherit">
        <Link to="/register" className={classes.button}>
          Register
        </Link>
      </Button>
      <Button color="inherit">
        <Link to="/login" className={classes.button}>
          Login
        </Link>
      </Button>
    </div>
  );

  const authSelction = (
    <div>
      <Button color="inherit">
        <Link className={classes.link} to="/profile">
          {name ? name : user ? user.name : null}
        </Link>
      </Button>
      <Button>
        <Link to="/register" className={classes.button}>
          N
        </Link>
      </Button>

      <Button
        color="inherit"
        onClick={() => {
          logout();
        }}
      >
        <Link to="/" className={classes.button}>
          Logout
        </Link>
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className={classes.toolbar} position="static">
          <Typography variant="h6">Appiness Interactive</Typography>
          <Button color="inherit">
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/dashboard" className={classes.link}>
              Dashboard
            </Link>
          </Button>
          <Typography className={classes.title}></Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          {!loading && (
            <Fragment>
              {isAuthenticated ? authSelction : guestLSection}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
DesktopMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps, { logout })(DesktopMenu);

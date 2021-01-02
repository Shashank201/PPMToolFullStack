import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import "./Header.css";

class Header extends Component {
  state = {
    showMobMenu: false,
  };

  toggleMobMenuHandler = () => {
    let value = this.state.showMobMenu;
    this.setState({ showMobMenu: !value });
  };

  logoutHandler = () => this.props.logout();
  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <React.Fragment>
        <Link className="nav-link" to="/dashboard">
          <span>Dashboard</span>
        </Link>

        <Link className="nav-link" to="/dashboard">
          <span>
            <i className="fas fa-user-circle mr-1" />
            {user ? user.fullName : ""}
          </span>
        </Link>

        <Link className="nav-link" to="/" onClick={this.logoutHandler}>
          <span> Logout</span>
        </Link>
      </React.Fragment>
    );

    const userIsNotAuthenticated = (
      <React.Fragment>
        <Link className="nav-link " to="/register">
          <span>Sign Up</span>
        </Link>

        <Link className="nav-link" to="/login">
          <span>Login</span>
        </Link>
      </React.Fragment>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <React.Fragment>
        <header>
          <div className="logo">
            <Link className="navbar-brand" to="/">
              <span>Personal Project Management Tool</span>
            </Link>
          </div>
          <div className="menu-bar">{headerLinks}</div>

          <div
            className="toggle-menu-button"
            onClick={this.toggleMobMenuHandler}
          >
            <i className="fa fa-bars"></i>
          </div>
        </header>
        {this.state.showMobMenu ? (
          <div className="mob-menu">{headerLinks}</div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

Header.proptype = {
  security: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);

import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class Register extends Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="section-heading">SIGN UP</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName,
                    })}
                    placeholder="Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onFieldChangeHandler}
                    title="Name"
                  />
                  <span className="invalid-feedback">{errors.fullName}</span>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onFieldChangeHandler}
                    title="Email"
                  />
                  <span className="invalid-feedback">{errors.username}</span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onFieldChangeHandler}
                    title="Password must be atleast 6 characters"
                  />
                  <span className="invalid-feedback">{errors.password}</span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword,
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onFieldChangeHandler}
                  />
                  <span className="invalid-feedback">
                    {errors.confirmPassword}
                  </span>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.proptype = {
  createNewUser: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { createNewUser })(Register);

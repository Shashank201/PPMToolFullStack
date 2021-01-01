import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/securityActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const loginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(loginRequest);
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onFieldChangeHandler}
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
                  />
                  <span className="invalid-feedback">{errors.password}</span>
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

Login.proptype = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

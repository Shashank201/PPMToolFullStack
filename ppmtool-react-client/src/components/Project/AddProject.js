import React, { Component } from "react";
import { createProject } from "../../actions/projectActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

class AddProject extends Component {
  state = {
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {},
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createProject(newProject, this.props.history);
  };

  // React Life Cycle function

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="section-heading">CREATE PROJECT</h5>
              <hr />
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onFieldChangeHandler}
                    title="Name is required"
                  />
                  <span className="invalid-feedback">{errors.projectName}</span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.onFieldChangeHandler}
                    title="Unique ID must be of 4 to 5 characters"
                  />
                  <span className="invalid-feedback">
                    {errors.projectIdentifier}
                  </span>
                </div>
                {
                  // <!-- disabled for Edit Only!! remove "disabled" for the Create operation -->
                }
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onFieldChangeHandler}
                    title="Description is required"
                  ></textarea>
                  <span className="invalid-feedback">{errors.description}</span>
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.start_date,
                    })}
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onFieldChangeHandler}
                  />
                  <span className="invalid-feedback">{errors.start_date}</span>
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.end_date,
                    })}
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onFieldChangeHandler}
                  />
                  <span className="invalid-feedback">{errors.end_date}</span>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);

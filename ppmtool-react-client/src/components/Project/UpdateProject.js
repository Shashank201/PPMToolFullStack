import React, { Component } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

class UpdateProject extends Component {
  state = {
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.project) {
      const {
        id,
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
      } = nextProps.project;

      this.setState({
        id,
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    this.props.createProject(updateProject, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="section-heading">UPDATE PROJECT</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
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
                    disabled
                    value={this.state.projectIdentifier}
                    onChange={this.onFieldChangeHandler}
                  />
                  <span className="invalid-feedback">
                    {errors.projectIdentifier}
                  </span>
                </div>
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
                    value={this.state.start_date ? this.state.start_date : ""}
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
                    value={this.state.end_date ? this.state.end_date : ""}
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

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);

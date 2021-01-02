import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class UpdateProjectTask extends Component {
  state = {
    id: "",
    projectSequence: "",
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
    projectIdentifier: "",
    errors: {},
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.getProjectTask(
      this.props.match.params.backlog_id,
      this.props.match.params.pt_id,
      this.props.history
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project_task) {
      const {
        id,
        projectSequence,
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate,
        projectIdentifier,
      } = nextProps.project_task;

      this.setState({
        id,
        projectSequence,
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate,
        projectIdentifier,
      });
    }
  }

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { projectIdentifier, projectSequence } = this.state;

    const updatedProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
    };

    this.props.updateProjectTask(
      projectIdentifier,
      projectSequence,
      updatedProjectTask,
      this.props.history
    );
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${this.props.match.params.backlog_id}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="section-heading">UPDATE PROJECT TASK</h4>
              <p className="lead text-center">
                <strong>
                  Project Name: {this.state.projectIdentifier} | Project Code:{" "}
                  {this.state.projectSequence}
                </strong>
              </p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onFieldChangeHandler}
                    title="Task summary is required"
                  />
                  <span className="invalid-feedback">{errors.summary}</span>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onFieldChangeHandler}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate ? this.state.dueDate : ""}
                    onChange={this.onFieldChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onFieldChangeHandler}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onFieldChangeHandler}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
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

UpdateProjectTask.proptype = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);

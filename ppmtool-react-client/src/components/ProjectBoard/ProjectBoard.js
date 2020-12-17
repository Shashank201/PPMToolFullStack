import React, { Component } from "react";
import Backlog from "./Backlog";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  componentDidMount() {
    this.props.getBacklog(this.props.match.params.id);
  }

  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.props;

    let boardContent;

    if (project_tasks?.length < 1) {
      if (errors?.projectNotFound) {
        boardContent = (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectNotFound}
          </div>
        );
      } else {
        boardContent = (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board
          </div>
        );
      }
    } else {
      boardContent = <Backlog project_tasks={project_tasks} />;
    }

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {boardContent}
        {/*<!--Backlog STARTS HERE -->  <!-- Backlog ENDS HERE -->*/}
      </div>
    );
  }
}

ProjectBoard.proptype = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);

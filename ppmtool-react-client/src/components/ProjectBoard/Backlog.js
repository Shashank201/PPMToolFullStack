import React, { Component } from "react";
import ProjectTasks from "./ProjectTasks/ProjectTasks";

export default class Backlog extends Component {
  render() {
    const { project_tasks } = this.props;

    const todo_tasks = project_tasks.filter((task) => task.status === "TO_DO");
    const inprogress_tasks = project_tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    );
    const done_tasks = project_tasks.filter((task) => task.status === "DONE");

    const todo_project_tasks = todo_tasks.map((project_task) => (
      <ProjectTasks key={project_task.id} project_task={project_task} />
    ));

    const inprogress_project_tasks = inprogress_tasks.map((project_task) => (
      <ProjectTasks key={project_task.id} project_task={project_task} />
    ));

    const done_project_tasks = done_tasks.map((project_task) => (
      <ProjectTasks key={project_task.id} project_task={project_task} />
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h5>TO DO</h5>
              </div>
            </div>

            {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->*/}
            {todo_project_tasks}
            {/* <!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h5>IN PROGRESS</h5>
              </div>
            </div>
            {inprogress_project_tasks}
            {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->  <!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h5>DONE</h5>
              </div>
            </div>
            {done_project_tasks}
            {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->  <!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
          </div>
        </div>
      </div>
    );
  }
}

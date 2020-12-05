import React, { Component } from "react";
import Header from "./Layout/Header";
import ProjectItem from "./Project/ProjectItem";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 className="alert alert-warning">Welcome to the Dashboard</h1>
        <ProjectItem />
      </div>
    );
  }
}

export default Dashboard;

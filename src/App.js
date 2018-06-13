import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table';
import DropdownTable from './DropdownTable';

const allFiles = ["hello", "world", "shushu"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //path: "",
      // Need to change this and the secondary one later when connected with the backend.
      primaryFile: allFiles[0],
      secondaryFiles: this.calcSecondery(),
    };

    this.primaryFileSelect = this.primaryFileSelect.bind(this);
  }

  calcSecondery(primaryFile=allFiles[0]) {
    let index = allFiles.indexOf(primaryFile);
    let newSecondary = [...allFiles];
    newSecondary.splice(index, 1);
    return newSecondary
  }

  primaryFileSelect(primaryFile) {

    this.setState({secondaryFiles: this.calcSecondery(primaryFile), primaryFile});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="flex justify-center">
          <label for="primary">Select a primary file</label>
          <DropdownTable selectOptions={allFiles} onValueChange={this.primaryFileSelect} id="primary" />
        </div>
        <br />
        <div className="flex justify-center">
          <Table files={this.state.secondaryFiles} />
        </div>
      </div>
    );
  }
}

export default App;

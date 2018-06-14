import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table';
import DropdownTable from './DropdownTable';


class File {
  constructor(fileName, matchType, orderNumber) {
      this.fileName = fileName;
      this.matchType = matchType;
      this.orderNumber = orderNumber;
  }
}

const allFiles = ["hello", "world", "shushu"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //path: "",
      // Need to change this and the secondary one later when connected with the backend.
      primaryFile: allFiles[0],
      secondaryFiles: this.calcSecondery(),
      fileDict: this.createDict(this.calcSecondery()),
      resetKey: "1",
    };

    this.primaryFileSelect = this.primaryFileSelect.bind(this);
    this.matchValueChanged = this.matchValueChanged.bind(this);
    this.orderValueChanged = this.orderValueChanged.bind(this);
  }

  createDict(secondaryFiles, matchType = "match", orderNumber = "1") {
    const fileDict = {};
    for (let filename of secondaryFiles) {
      fileDict[filename] = new File(filename, matchType, orderNumber);
    }
    return fileDict;
  }

  calcSecondery(primaryFile=allFiles[0]) {
    let index = allFiles.indexOf(primaryFile);
    let newSecondary = [...allFiles];
    newSecondary.splice(index, 1);
    return newSecondary;
  }

  matchValueChanged(filename, matchType) {
    const primary = this.state.primaryFile;
    let newFileDict = Object.assign({}, this.state.fileDict);
    //delete newFileDict[primary];  // if primary has changed file dict will change accordingly.
    for (let file in newFileDict) {
      if (newFileDict[file].fileName === filename) {
        newFileDict[file] = new File(filename, matchType, newFileDict[file].orderNumber);
      }
    }
    this.setState({fileDict: newFileDict}, () => {
      console.log("filedict: ", this.state.fileDict);
    });
  }

  orderValueChanged (filename, orderNumber) {
    const primary = this.state.primaryFile;
    let newFileDict = Object.assign({}, this.state.fileDict);
    //delete newFileDict[primary];  // if primary has changed file dict will change accordingly.
    for (let file in newFileDict) {
      if (newFileDict[file].fileName === filename) {
        newFileDict[file] = new File(filename, newFileDict[file].matchType, orderNumber);
      }
    }
    this.setState({fileDict: newFileDict}, () => {
      console.log("filedict: ", this.state.fileDict);
    });
  }

  primaryFileSelect(primaryFile) {
    const secondaryCopy = this.calcSecondery(primaryFile);
    let newFileDict = this.createDict(secondaryCopy);
    let newResetKey = this.state.resetKey + "1";
    this.setState({secondaryFiles: secondaryCopy,
      primaryFile: primaryFile,
      fileDict: newFileDict,
      resetKey: newResetKey,
    }, () => {console.log(this.state.fileDict)});

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
          <label htmlFor="primary">Select a primary file</label>
          <DropdownTable selectOptions={allFiles} onValueChange={this.primaryFileSelect} id="primary" resetKey="0" />
        </div>
        <br />
        <div className="flex justify-center">
          <Table files={this.state.secondaryFiles} onMatchValueChange={this.matchValueChanged} onOrderValueChange={this.orderValueChanged} resetKey={this.state.resetKey} />
        </div>
      </div>
    );
  }
}

export default App;


// class Table extends Component {
//   constructor(props) {
//       super(props);

//       const filesClassArray = [];
//       this.props.files.forEach(fileName => {
//           filesClassArray.push(new File(fileName, "match", "1" ));
//       });

//       this.state = {
//           filesState: filesClassArray,
//       }

//       this.setFileState = this.setFileState.bind(this);
//   }

//   setFileState(fileName, matchType, orderNumber) {

//       const oldFileArray = [...this.state.filesState];

//       for(let i = 0; i< oldFileArray.length; i++) {
//           if (this.state.filesState[i].fileName === fileName) {
//               oldFileArray[i] = { fileName, matchType, orderNumber };
//               console.log("changed file", oldFileArray[i]);
//           }
//       }

//       this.setState({filesState: oldFileArray}, () => {
//           console.log(this.state.filesState);
//       });
//   }
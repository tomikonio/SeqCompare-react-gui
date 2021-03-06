import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import SeqTable from './SeqTable';
import DropdownTable from './DropdownTable';
// import './Center.css';
import PythonShell from 'python-shell';
import { Container, Button, Label, Divider, Segment } from 'semantic-ui-react';

const { dialog } = require('electron').remote;
const fs = require('fs');
const nodePath = require('path');

class File {
  constructor(fileName, matchType, orderNumber) {
    this.fileName = fileName;
    this.matchType = matchType;
    this.orderNumber = orderNumber;
  }
}

function checkIfCompare(folderPath) {
  const files = fs.readdirSync(String(folderPath));
  for (const file of files) {
    let fileStats = fs.statSync(nodePath.join(String(folderPath), file));
    if ((file.startsWith('compare') || file.startsWith('Compare')) && fileStats.isDirectory()) {
      console.log('compare', file);
      return true;
    }
  }
  return false;
}

// const allFiles = ["hello", "world", "shushu"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      // Need to change this and the secondary one later when connected with the backend.
      allFiles: [],
      primaryFile: '',
      secondaryFiles: [],
      fileDict: {},
      resetKey: '1',
      primaryReset: '1',
      running: false,
    };

    this.primaryFileSelect = this.primaryFileSelect.bind(this);
    this.matchValueChanged = this.matchValueChanged.bind(this);
    this.orderValueChanged = this.orderValueChanged.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.onGoButton = this.onGoButton.bind(this);
  }

  createDict(secondaryFiles) {
    const fileDict = {};
    for (const filename of secondaryFiles) {
      fileDict[filename] = new File(filename, 'match', '1');
    }
    return fileDict;
  }

  calcSecondery(primaryFile = this.state.allFiles[0], allFiles = this.state.allFiles) {
    const index = allFiles.indexOf(primaryFile);
    const newSecondary = [...allFiles];
    newSecondary.splice(index, 1);
    return newSecondary;
  }

  matchValueChanged(filename, matchType) {
    // const primary = this.state.primaryFile;
    const newFileDict = Object.assign({}, this.state.fileDict);
    for (const file in newFileDict) {
      if (newFileDict[file].fileName === filename) {
        newFileDict[file] = new File(filename, matchType, newFileDict[file].orderNumber);
      }
    }
    this.setState({ fileDict: newFileDict }, () => {
      console.log('filedict: ', this.state.fileDict);
    });
  }

  orderValueChanged(filename, orderNumber) {
    // const primary = this.state.primaryFile;
    const newFileDict = Object.assign({}, this.state.fileDict);
    for (const file in newFileDict) {
      if (newFileDict[file].fileName === filename) {
        newFileDict[file] = new File(filename, newFileDict[file].matchType, orderNumber);
      }
    }
    this.setState({ fileDict: newFileDict }, () => {
      console.log('filedict: ', this.state.fileDict);
    });
  }

  primaryFileSelect(primaryFile) {
    const secondaryCopy = this.calcSecondery(primaryFile);
    const newFileDict = this.createDict(secondaryCopy);
    const newResetKey = `${this.state.resetKey}1`;
    this.setState(
      {
        secondaryFiles: secondaryCopy,
        primaryFile,
        fileDict: newFileDict,
        resetKey: newResetKey,
      },
      () => {
        console.log(this.state.fileDict);
      },
    );
  }

  openDialog() {
    const folderPath = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (folderPath !== undefined) {
      const fastaFiles = [];
      const files = fs.readdirSync(String(folderPath));
      if (checkIfCompare(folderPath) === false) {
        for (const file of files) {
          if (nodePath.extname(file) === '.fasta') {
            fastaFiles.push(file);
          }
        }
        if (fastaFiles.length < 2) {
          dialog.showMessageBox({
            message: `The folder: "${folderPath}" needs to have at least 2 ".fasta" files`,
            type: 'warning',
            buttons: ['OK'],
          });
        } else {
          const newSecondary = this.calcSecondery(fastaFiles[0], fastaFiles);
          const newFileDict = this.createDict(newSecondary);
          this.setState(
            {
              secondaryFiles: newSecondary,
              primaryFile: fastaFiles[0],
              allFiles: fastaFiles,
              fileDict: newFileDict,
              path: folderPath,
              primaryReset: this.state.primaryReset + '1',
            },
            () => {
              console.log(this.state);
            },
          );
        }
      } else {
        dialog.showMessageBox({
          message: `The folder: "${folderPath}" contains a folder named "compare_", please remove this folder before choosing this location again`,
          type: 'warning',
          buttons: ['OK'],
        });
      }
    }
  }

  onGoButton() {
    if (this.state.path === '') {
      dialog.showMessageBox({
        message: 'Please select a folder first',
        type: 'info',
        buttons: ['OK'],
      });
    }
    else if (checkIfCompare(this.state.path)) {
      dialog.showMessageBox({
        message: 'The folder has a "compare_" subfolder, please remove it before use',
        type: 'info',
        buttons: ['OK'],
      });
    } 
    else {
      const filedict = this.state.fileDict;
      const secondaryFiles = {};
      for (let i = 1; i < this.state.secondaryFiles.length + 1; i++) {
        for (const file in filedict) {
          if (filedict[file].orderNumber === i.toString()) {
            console.log(filedict[file].orderNumber, i);
            secondaryFiles[filedict[file].fileName] =
              filedict[file].matchType === 'match' ? 'm' : 'nm';
          }
        }
      }
      const sentFiles = JSON.stringify(secondaryFiles);
      this.setState({ running: true });
      console.log(sentFiles);
      const pythonOptions = {
        pythonPath: `${__dirname}/../../projectSce/venv/bin/python3`,
        scriptPath: `${__dirname}/../../projectSce`,
        args: [this.state.primaryFile, sentFiles, this.state.path],
      };

      const shellPy = PythonShell.run('run_compare.py', pythonOptions, (err, results) => {
        if (err) {
          this.setState({ running: false });
          throw err;
        }
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
      });

      shellPy.on('close', (message) => {
        console.log(message);
        this.setState({ running: false });
      });
    }
  }

  render() {
    return (
      <Container fluid className="App">
        {/* <div className="App"> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <br />
        <Container>
          <Label size="large" color="grey" htmlFor="pathChoose">Select a Folder:</Label>
          <Button
            color="linkedin"
            compact
            size="medium"
            href="#0"
            id="pathChoose"
            onClick={this.openDialog}
          >
            Browse...
          </Button>
        </Container>
        <br />
        <p>
          Selected Folder: <i>{this.state.path}</i>
        </p>
        <Divider section />
        <div className="center">
          <Label size="large" htmlFor="primary">Select a primary file:</Label>
          <DropdownTable
            selectOptions={this.state.allFiles}
            onValueChange={this.primaryFileSelect}
            resetKey={this.state.primaryReset}
          />
        </div>
        <br />
        <SeqTable
          files={this.state.secondaryFiles}
          onMatchValueChange={this.matchValueChanged}
          onOrderValueChange={this.orderValueChanged}
          resetKey={this.state.resetKey}
        />
        <br />
        <div className="center">
          <Button color="linkedin" onClick={this.onGoButton}>
            GO
          </Button>
        </div>
        {this.state.running === true ? <p>Running....</p> : null}
        {/* </div> */}
      </Container>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
// import './App.css';
import DropDownTable from './DropdownTable'

class TableRow extends Component {
    constructor(props) {
        super(props);

        this.onMatchValueChange = this.onMatchValueChange.bind(this);
        this.onOrderValueChange = this.onOrderValueChange.bind(this);
    }

    onMatchValueChange(matchValue) {
        this.props.onMatchValueChange(this.props.filename, matchValue);
    }

    onOrderValueChange(orderValue) {
        this.props.onOrderValueChange(this.props.filename, orderValue);
    }

    render() {
        const filename = this.props.filename;
        const numFiles = this.props.numFiles;
        const arr = [...Array(numFiles + 1).keys()];
        arr.shift();

        return (
            <Table.Row>
                <Table.Cell collapsing>{filename}</Table.Cell>
                <Table.Cell collapsing><DropDownTable selectOptions={["match", "not-match"]} onValueChange={this.onMatchValueChange} resetKey={this.props.resetKey} /></Table.Cell>
                <Table.Cell collapsing><DropDownTable selectOptions={arr} onValueChange={this.onOrderValueChange} resetKey={this.props.resetKey} /></Table.Cell>
            </Table.Row>
        );
    }
}

export default TableRow;

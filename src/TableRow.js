import React, { Component } from 'react';
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
            <tr className="striped--light-gray" >
                <td className="pv2 ph3 tl">{filename}</td>
                <td className="pv2 ph3"><DropDownTable selectOptions={["match", "not-match"]} onValueChange={this.onMatchValueChange} resetKey={this.props.resetKey} /></td>
                <td className="pv2 ph3"><DropDownTable selectOptions={arr} onValueChange={this.onOrderValueChange} resetKey={this.props.resetKey} /></td>
            </tr>
        );
    }
}

export default TableRow;

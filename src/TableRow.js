import React, { Component } from 'react';
import './App.css';
import DropDownTable from './DropdownTable'

class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const filename = this.props.filename;
        const numFiles = this.props.numFiles;
        const arr = [...Array(numFiles + 1).keys()];
        arr.shift();

        return (
            <tr className="striped--light-gray" >
                <td className="pv2 ph3">{filename}</td>
                <td className="pv2 ph3"><DropDownTable selectOptions={["match", "not-match"]} /></td>
                <td className="pv2 ph3"><DropDownTable selectOptions={arr} /></td>
            </tr>
        );
    }
}

export default TableRow;

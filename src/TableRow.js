import React, { Component } from 'react';
import './App.css';

class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const filename = this.props.filename;
        return (
            <tr className="striped--light-gray" >
                <td className="pv2 ph3">{filename}</td>
                <td className="pv2 ph3">DropDown</td>
                <td className="pv2 ph3">NumberDropDown</td>
            </tr>
        );
    }
}

export default TableRow;

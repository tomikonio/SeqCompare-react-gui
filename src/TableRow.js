import React, { Component } from 'react';
import './App.css';
import DropDownTable from './DropdownTable'

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchValue: "match",
            orderValue: "1",
        };

        this.onMatchValueChange = this.onMatchValueChange.bind(this);
        this.onOrderValueChange = this.onOrderValueChange.bind(this);
    }

    onMatchValueChange(matchValue) {
        this.setState({matchValue});
        this.props.onValueChange(this.props.filename, matchValue, this.state.orderValue);
    }

    onOrderValueChange(orderValue) {
        this.setState({orderValue});
        this.props.onValueChange(this.props.filename, this.state.matchValue, orderValue);
    }

    render() {
        const filename = this.props.filename;
        const numFiles = this.props.numFiles;
        const arr = [...Array(numFiles + 1).keys()];
        arr.shift();

        return (
            <tr className="striped--light-gray" >
                <td className="pv2 ph3">{filename}</td>
                <td className="pv2 ph3"><DropDownTable selectOptions={["match", "not-match"]} onValueChange={this.onMatchValueChange}/></td>
                <td className="pv2 ph3"><DropDownTable selectOptions={arr} onValueChange={this.onOrderValueChange}/></td>
            </tr>
        );
    }
}

export default TableRow;

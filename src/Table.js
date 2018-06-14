import React, { Component } from 'react';
import './App.css';
import TableRow from './TableRow';

class Table extends Component {
    constructor(props) {
        super(props);

        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(filename, matchType, orderNumber) {
        this.props.onValueChange(filename, matchType, orderNumber);
    }

    render() {
        const files = this.props.files;
        return (
            <table className="collapse ba br2 b--black-10 pv2 ph3" >
                <thead>
                    <tr className="striped--light-gray">
                        <th className="pv2 ph3 tl f6 fw6 ttu">Filename</th>
                        <th className="pv2 ph3 tl f6 fw6 ttu">Match/Not-match</th>
                        <th className="pv2 ph3 tl f6 fw6 ttu">Order</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        files.map((file) =>
                            <TableRow filename={file} numFiles={files.length} onValueChange={this.onHandleChange} />
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default Table;

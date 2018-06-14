import React, { Component } from 'react';
import './App.css';
import TableRow from './TableRow';

class Table extends Component {
    constructor(props) {
        super(props);

        this.onMatchValueChange = this.onMatchValueChange.bind(this);
        this.onOrderValueChange = this.onOrderValueChange.bind(this);
    }

    onMatchValueChange (filename, matchType) {
        console.log("match", filename, matchType);
        this.props.onMatchValueChange(filename, matchType);
    }

    onOrderValueChange (filename, orderNumber) {
        this.props.onOrderValueChange(filename, orderNumber);
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
                            <TableRow filename={file} numFiles={files.length} onMatchValueChange={this.onMatchValueChange} onOrderValueChange={this.onOrderValueChange} resetKey={this.props.resetKey} />
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default Table;

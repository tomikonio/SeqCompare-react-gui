import React, { Component } from 'react';
import { Table, Container } from 'semantic-ui-react';
// import './App.css';
import TableRow from './TableRow';

class SeqTable extends Component {
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
            <Container textAlign='center'>
                <Table celled striped stackable compact color='blue'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>Filename</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Match/Not-match</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Order</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            files.map((file) =>
                                <TableRow filename={file} key={file} numFiles={files.length} onMatchValueChange={this.onMatchValueChange} onOrderValueChange={this.onOrderValueChange} resetKey={this.props.resetKey} />
                            )
                        }
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default SeqTable;

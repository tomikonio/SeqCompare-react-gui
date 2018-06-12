import React, { Component } from 'react';
import './App.css';

class DropDownTable extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.selectOptions[0]};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const selectOptions = this.props.selectOptions;
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                {
                    selectOptions.map((selectOption) => 
                    <option value={selectOption}>
                        {selectOption}
                    </option>
                    )
                }
            </select>
        );
    }
}

export default DropDownTable;

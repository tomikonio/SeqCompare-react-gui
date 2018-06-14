import React, { Component } from 'react';
import './App.css';

class DropDownTable extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onValueChange(event.target.value);
    }

    render() {
        const selectOptions = this.props.selectOptions;
        return (
            <select defaultValue={this.props.selectOptions[0]} onChange={this.handleChange} key={this.props.resetKey}>
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

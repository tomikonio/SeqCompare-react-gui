import React, { Component } from 'react';
import './App.css';

class DropDownTable extends Component {
    constructor(props) {
        super(props);
        // this.state = {value: this.props.selectOptions[0]};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        //this.setState({value: event.target.value});
        this.props.onValueChange(event.target.value);
    }

    render() {
        const selectOptions = this.props.selectOptions;
        return (
            <select defaultValue={this.props.selectOptions[0]} onClick={this.handleChange}>
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

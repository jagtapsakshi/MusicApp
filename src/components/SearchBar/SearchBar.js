import React, { Component } from 'react';
import "./SearchBar.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        };
        
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value }); // Corrected to event.target.value
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleEnter(event) {
        if (event.keyCode === 13) { // Corrected to event.keyCode
            this.search();
        }
    }

    render() {
        return (
            <div className='SearchBar'>
                <input
                    placeholder="Enter song, album or artist" // Corrected typo in placeholder
                    onChange={this.handleTermChange}
                    onKeyUp={this.handleEnter}
                />
                <button className='SearchButton' onClick={this.search}>
                    SEARCH
                </button>
            </div>
        );
    }
}

export default SearchBar;

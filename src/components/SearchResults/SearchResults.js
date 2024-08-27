import React, { Component } from 'react';
import "./SearchResults.css";
import Tracklist from '../TrackList/Tracklist'; // Ensure the path is correct

class SearchResults extends Component {
    render() {
        return (
            <div className='SearchResults'>
                <h2>Results</h2>
                <Tracklist 
                    tracks={this.props.SearchResults} 
                    onAdd={this.props.onAdd} 
                />   
            </div>
        );
    }
}

export default SearchResults;

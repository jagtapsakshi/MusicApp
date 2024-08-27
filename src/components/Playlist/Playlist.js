import React, { Component } from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/Tracklist';
import PropTypes from 'prop-types'; // Import PropTypes for validation

class Playlist extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className='Playlist'>
                <input 
                    onChange={this.handleNameChange} 
                    defaultValue="New Playlist" 
                />
                <Tracklist 
                    tracks={this.props.playlistTracks} // Corrected prop name
                    isRemoval={true}
                    onRemove={this.props.onRemove} 
                />
                <button 
                    className='Playlist-save' 
                    onClick={this.props.onSave}
                >
                    Save to Spotify
                </button>
            </div>
        );
    }
}

// Add PropTypes for type-checking props
Playlist.propTypes = {
    playlistTracks: PropTypes.array.isRequired, // Ensure this is an array
    onNameChange: PropTypes.func.isRequired,    // Ensure this is a function
    onRemove: PropTypes.func.isRequired,        // Ensure this is a function
    onSave: PropTypes.func.isRequired           // Ensure this is a function
};

export default Playlist;

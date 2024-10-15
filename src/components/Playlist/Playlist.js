import React, { Component } from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/Tracklist';
import PropTypes from 'prop-types';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value); // Call to update playlist name if needed
    }

    render() {
        return (
            <div className='Playlist'>
                <input
                    value="New Playlist" // Use value to set the default name as non-editable
                    readOnly // Make input non-editable
                />
                <Tracklist
                    tracks={this.props.playlistTracks}
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

// PropTypes validation
Playlist.propTypes = {
    playlistTracks: PropTypes.array.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default Playlist;

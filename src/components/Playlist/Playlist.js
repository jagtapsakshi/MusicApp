import React, { Component } from 'react';
import "./Playlist.css"
import Tracklist from"../TrackList/Tracklist";

class Playlist extends Component {
    constructor(peops){
        super(this.props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }



    render() {
        return (
            <div className='Playlist'>
                <input onChange={this.handleNameChange} defaultValue={"New Playlist"}
                />
                <Tracklist track ={ this.props.PlaylistTracks}
                    isRemoval = {true}
                    onRemove={this.props.onRemove} />
                    <button className='Playlist-save' onClick={this.props.onSave}>Save to Spotify</button>
            </div>
        );
    }
}

export default Playlist;
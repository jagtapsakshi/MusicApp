import React, { Component } from 'react';
import "./Tracklist.css";
import Track from "../Track/Track";

class Tracklist extends Component {
    render() {
        // Add a check for this.props.tracks to ensure it's defined
        return (
            <div className='Tracklist'>
                {this.props.tracks && this.props.tracks.length > 0 ? (
                    this.props.tracks.map(track => (
                        <Track 
                            track={track}
                            key={track.id}
                            onAdd={this.props.onAdd}
                            isRemoval={this.props.isRemoval}
                            onRemove={this.props.onRemove}
                        />
                    ))
                ) : (
                    <p>No tracks available</p>
                )}
            </div>
        );
    }
}

export default Tracklist;

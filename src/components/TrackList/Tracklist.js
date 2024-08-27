import React, { Component } from 'react';
import "./Tracklist.css"
import Track from "../Track/Track"

class Tracklist extends Component {
    render() {
        return (
            <div className='Tracklist'>
                {this.props.tracks.map(track => {
                    return (
                        <Track 
                            track ={track}
                            key = {track.id}
                            onAdd={this.props.onAdd}
                            isRemoval={this.props.isRemoval}
                            onRemove={this.props.onRemove}
                        />
                    );
                })}
                
            </div>
        );
    }
}

export default Tracklist;
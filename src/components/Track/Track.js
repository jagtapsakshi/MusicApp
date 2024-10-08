import React, { Component } from 'react';
import "./Track.css";

class Track extends Component {
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track); // Corrected this.state.track to this.props.track
    }

    renderAction() {
        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}>-</button>
            );
        } else {
            return (
                <button className="Track-action" onClick={this.addTrack}>+</button>
            );
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} \ {this.props.track.album}</p>
                    <iframe
                        src={"https://open.spotify.com/embed/track/" + this.props.track.id}
                        width="300"
                        height="80"
                        frameBorder="0" // Corrected frameborder to frameBorder
                        allowTransparency="true" // Corrected allowtransperacy to allowTransparency
                        allow="encrypted-media"
                        title="preview"
                    />
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;

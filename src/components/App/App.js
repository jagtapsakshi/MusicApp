import React, { Component } from 'react';
import './App.css';
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";  // Fixed the double slashes
import SearchResults from "../SearchResults/SearchResults";
import Spotify from '../../util/Spotify'; // Correct relative path


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this); // Fixed typo: `binf` -> `bind`
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removetrackSearch = this.removetrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTracks: tracks });
  }

  removetrackSearch(track) {
    let tracks = this.state.SearchResults; // Fixed typo: `thsi` -> `this` and corrected the logic
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }

  doThese(track) {
    this.addTrack(track);
    this.removetrackSearch(track);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name }); // Fixed incorrect state update
  }

  savePlaylist() {
    const trackUrls = this.state.playlistTracks.map(track => track.url);
    Spotify.savePlaylist(this.state.playlistName, trackUrls).then(() => {
      this.setState({
        playlistName: "New Playlist",  // Fixed incorrect state update
        playlistTracks: []
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <a href="https://localhost:3000">Musico</a>
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.doThese} />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

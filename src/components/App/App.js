import React, { Component }  from 'react';
import './App.css';
import Playlist from "../Playlist/Playlist";
import SearchBar from  ".//SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../util/Spotify";

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      SearchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
  
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.binf(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removetrackSearch = this.removetrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term){
    Spotify.search(term).then(SearchResults => {
      this.setState({SearchResults: SearchResults});
    })
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id ===track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({playlistTracks: tracks});
  }

  removetrackSearch(track){
    let track = thsi.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({SearchResults: tracks});
  }

  doThese(track){
    this.addTrack(track);
    this.removetrackSearch(track);
  }

  updatePlaylistName(name){
    this.setState({updatePlaylistName: name})
  }

  savePlaylist(name){
    const trackUrls = this.state.playlistTracks.map(track => track.url);
    Spotify.savePlaylist(this.state.playlistName.trackUrls).then( () => {
      this.setState({
        updatePlaylistName: "New Playlist", 
        playlistTracks: []
      });
    });
  }
}

function App() {
  return (
    <div>
      <h1>
        <a href="https://localhost:3000">Musico</a>
      </h1>
      <div className='App'>
        <SearchBar onSearch={this.search} />
        <div className='App-playlist'>
          <SearchResults SearchResults={this.state.SearchResults} onAdd ={this.doThese}/>
          <Playlist playlistTracks={this.state.playlistTracks} onNameChange ={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylis}/> 
        </div>
      </div>
    </div>
  );
}

export default App;
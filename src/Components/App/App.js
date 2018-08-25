import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [], //EDIT
      searchTerm: ''
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

    if (localStorage != this.state.searchTerm) { //EDIT
      this.storage;
    }
  }
  storageAvailable(type) //check the browser' support of the storage fction
  {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage.length !== 0;
    }
}
  storage() {
    if (this.storageAvailable('localStorage'))
    {
      //if(!localStorage.getItem('SearchBarText')) {
        localStorage.setItem('SearchBarText', document.getElementById('SearchBarText').value); // set the storage
        var sTerm = localStorage.getItem('SearchBarText'); // getting term from storage
        document.getElementById('SearchBarText').value = sTerm; // setting value of SearchBar with saved term
        this.setState({searchTerm: sTerm})
  //  }
  //    else {console.log('localstorage alredy set');}
  }
    else {console.log('localStorage not available');}
   // check if a searchTerm is stored in the localStorage, 
    //and then if it is... call setState to update your component's this.state.searchTerm.

  }
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.push(track);

    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    if (this.state.playlistTracks.length)
    {
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      }).then(alert('Your playlist has been saved in your Spotify account!'));
    }
    else {alert('Empty playlist cannot be saved.');}
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} term={this.state.searchTerm} />  {/* EDIT term={this.state.term} */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks}
                      onNameChange={this.updatePlaylistName}
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;


/*

use this in the App.js file. Possibly in the constructor method or in another lifecycle method.
You want your App component to get mounted, check if a searchTerm is stored in the localStorage, 
and then if it is... call setState to update your component's this.state.searchTerm.
Once that setState is called, the SearchBar is going to get re-rendered automatically 
with a new value in the search form.
But you want that initial search to set the value of the localStorage. 
Then when it redirects to authenticate and comes back... The App will mount and take care of checking the localStorage.

*/
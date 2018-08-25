import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
          };      
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }     
    handleTermChange(e) {
        const searchedTerm = e.target.value;
        this.setState({term: searchedTerm});
    }
    search() {
        this.props.onSearch(this.state.term);
    }
    render() {
        return (
        <div className="SearchBar">
            <input
                id='SearchBarText' 
                placeholder="Enter A Song, Album, or Artist" 
                onChange={this.handleTermChange}
                enterSubmit/>
            <a onClick={this.search}>SEARCH</a>
        </div>
        )
    }
}

export default SearchBar;
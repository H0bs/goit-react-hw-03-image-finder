import React, { Component } from "react";

import { Searchbar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled'

export class SearchBar extends Component {
  state = {
    inputValue: '',
  }
  onChange = e => { 
    this.setState({ inputValue: e.target.value })
    console.log(this.state.inputValue)
  }
  
  onSubmit = e => {
    e.preventDefault();
    if (this.state.query === '') {
      alert('Please, enter a value.');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  render() {
    return (
      <Searchbar>
        <SearchForm
          onSubmit={this.onSubmit}
        >
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.onChange}
          />
        </SearchForm>
      </Searchbar>
    )
  }
}
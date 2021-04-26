import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInput: ''
    }
  }

  handleChange(text){
    this.setState({userInput: text})
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={e=>this.handleChange(e.target.value)} placeholder="Search Your Feed" />

          <SearchIcon onClick={()=>this.props.searchPosts(this.state.userInput)} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}
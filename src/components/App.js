import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(obj => {
        const posts = obj.data;
        this.setState({posts})
        // console.log(this.state.posts)
      })
  }

  updatePost() {
  
  }

  deletePost() {

  }

  createPost() {

  }

  render() {
    const { posts } = this.state;
    let allPosts = getPosts(posts)
    // console.log(allPosts)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {/* insert code here to map over this.state.posts and render a Post component for each post in this.state.posts */}
          {allPosts}
        </section>
      </div>
    );
  }
}

function getPosts(posts){
  console.log(posts)
  if(posts.length!==0){
    console.log('posts was not empty')
    return(
      <div>
        {posts.map((post)=>{
          return(
            <Post key={post.id}/>
          )
        })}
      </div>)
    // console.log(allPosts)
    // return allPosts
  } else{
    console.log('posts was empty')
    let allPosts = <div>Empty Array</div>;
    return allPosts
  }
}

export default App;

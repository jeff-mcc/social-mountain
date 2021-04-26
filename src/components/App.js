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

  updatePost(id,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
      .then(res=>{
        this.setState({posts: res.data});
      })
  }

  deletePost() {

  }

  createPost() {

  }

  render() {
    const { posts } = this.state;
    // const {newThis} = this.updatePost;
    // console.log(newThis)
    let allPosts = getPosts(posts,this.updatePost)
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

function getPosts(posts,newThis){
  // console.log(newThis)
  if(posts.length!==0){
    return(
      <div>
        {posts.map((post)=>{
          return(
            <Post key={post.id}
                  text={post.text}
                  date={post.date}
                  id={post.id}
                  updatePostFn={newThis}/>
          )
        })}
      </div>)
  }
}

export default App;

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
      posts: [],
      searchInput: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind(this);
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

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res=>{
        this.setState({posts: res.data})
      })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`,{text})
      .then(res=>{
        this.setState({posts: res.data})
      })
  }

  searchPosts(text){
    let newText = encodeURI(text);
    this.setState({searchInput: newText})
  }

  render() {
    const { posts,searchInput } = this.state;
    // const {newThis} = this.updatePost;
    // console.log(newThis)
    let allPosts = getPosts(posts,this.updatePost,this.deletePost,searchInput)
    // console.log(allPosts)
    return (
      <div className="App__parent">
        <Header searchPosts={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {/* insert code here to map over this.state.posts and render a Post component for each post in this.state.posts */}
          {allPosts}
        </section>
      </div>
    );
  }
}

function getPosts(posts,updtThis,delThis,serInput){
  // console.log(newThis)
  if(posts.length!==0 && serInput===''){
    return(
      <div>
        {posts.map((post)=>{
          return(
            <Post key={post.id}
                  text={post.text}
                  date={post.date}
                  id={post.id}
                  updatePostFn={updtThis}
                  deletePostFn={delThis}
                  />
          )
        })}
      </div>)
  } else if (posts.length!==0 && serInput!==''){
    console.log(posts)
    let jsxArray = [];
    for (let i = 0; i<posts.length; i++){
      if(posts[i].text.includes(serInput)===true){
        jsxArray.push(
          // return(
          <div>
            <Post key={posts[i].id}
                  text={posts[i].text}
                  date={posts[i].date}
                  id={posts[i].id}
                  updatePostFn={updtThis}
                  deletePostFn={delThis}
                  />
          </div>
          // )
        )
        console.log(jsxArray)
      }
    }
    return jsxArray
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import Post from './Post'
import Pagination from './Pagination'
import '../App.css'


class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {posts:"",pageNumber:0}
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res=>{
      this.setState({posts:res.data,pageNumber:0,title:'',body:''});
    }).catch(error=>{
      this.setState({posts:"",pageNumber:0,title:'',body:'',networkError:true});
    });
  }
  showPosts = () =>{
    let posts = JSON.parse(JSON.stringify(this.state));
    if(posts.length === 0){
      return <h1>Loading ...</h1>
    }
    let res = [];
    let startPost = this.state.pageNumber * 10;
    let endPost = startPost + 10;
    for(let i = startPost ; i<endPost;i++){
        if(posts.posts[i] !== undefined){
      res.push(<Post key={posts.posts[i].id} id={posts.posts[i].id} title={posts.posts[i].title} body={posts.posts[i].body} /> );
        }
    }
    return <ul className="list-group">{res}</ul>;

  }

  createPost = async(evt)=>{
      let currentState = JSON.parse(JSON.stringify(this.state))
      currentState.posts.push({body:currentState.body,title:currentState.title,id:currentState.posts.length+1})
      currentState.title = "";
      currentState.body = "";
      this.setState(currentState);
    axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts/',
      data: {
        title: this.state.title,
        body: this.state.body,
        userId:1
      },
      headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    }).then(res=>{
      console.log('Created ...')
    });
  }

  changePage = (pageNumber)=>{
   let currentState = JSON.parse(JSON.stringify(this.state))
   currentState.pageNumber = pageNumber
   this.setState(currentState)
  }

  saveTitle = (evt) =>{
      let currentState = JSON.parse(JSON.stringify(this.state));
      currentState.title = evt.target.value;
      this.setState(currentState);
  }
  saveBody = (evt) =>{
    let currentState = JSON.parse(JSON.stringify(this.state));
    currentState.body = evt.target.value;
    this.setState(currentState);
}

  render() {
    return (
      <div className="container">
        <h1>Posts</h1>
        {this.state.networkError ? <p class="text-danger text-center">ERROR:Unable to reach the API Server, check your connectivity or try again later....</p>:''}
        <CreatePostBox saveTitle = {this.saveTitle} saveBody = {this.saveBody} saveButton = {this.createPost} title={this.state.title} body={this.state.body}/>
        <Pagination numberOfPosts = {this.state.posts.length} changePage = {this.changePage} />
        {this.showPosts()}
    </div>

    );
  }
}

class CreatePostBox extends React.Component{
    render(){
        return(  
        <div className="text-right">
            <input type="text" className="form-control" placeholder="Post title ..." onChange = {this.props.saveTitle} value={this.props.title}/>
        <textarea className="form-control" placeholder="Type your post" onChange = {this.props.saveBody} value={this.props.body} />
            <button className="btn btn-success" onClick={this.props.saveButton}>Create</button>
        </div>
        );
    }
}

export default Posts;

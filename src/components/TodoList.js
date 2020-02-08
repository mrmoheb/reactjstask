import React from 'react';
import axios from 'axios';
import Todo from './Todo'
import Pagination from './Pagination'
import '../App.css'


class TodoList extends React.Component {
  constructor(props){
    super(props)
    this.state = {todos:"",networkError:false}
   
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
      this.setState({todos:res.data,pageNumber:0});
    }).catch(error=>{
      this.setState({todos:"",pageNumber:0,networkError:true});
    });
  }
  showTodos = () =>{
    let todos = JSON.parse(JSON.stringify(this.state));
    if(todos.length === 0){
      return <h1>Loading ...</h1>
    }
    let res = [];
    let startPost = this.state.pageNumber * 10;
    let endPost = startPost + 10;
    for(let i = startPost ; i<endPost;i++){
      if(todos.todos[i] !== undefined){
      res.push(<Todo key={todos.todos[i].id} id={todos.todos[i].id} title={todos.todos[i].title} completed={todos.todos[i].completed} todoChecked={this.todoChecked} /> );
      }
    }
    return <ul>{res}</ul>;

  }

  todoChecked = async(evt)=>{
    let changedState = JSON.parse(JSON.stringify(this.state));
    changedState.todos[evt - 1].completed =  !changedState.todos[evt -1].completed;
    this.setState(changedState);
    axios({
      method: 'put',
      url: 'https://jsonplaceholder.typicode.com/todos/'+evt,
      data: {
        completed: changedState.todos[evt - 1].completed
      },
      headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    }).then(res=>{
      console.log('Updated ...')
    });
  }

  changePage = (pageNumber)=>{
   let currentState = JSON.parse(JSON.stringify(this.state))
   currentState.pageNumber = pageNumber
   this.setState(currentState)
  }

  render() {
    return (
      <div className="container">
        <h1>My Todo List</h1>
        {this.state.networkError ? <p class="text-danger text-center">ERROR:Unable to reach the API Server, check your connectivity or try again later....</p>:''}
        {this.showTodos()}
        <Pagination numberOfPosts = {this.state.todos.length} changePage = {this.changePage} />
    </div>

    );
  }
}

export default TodoList;

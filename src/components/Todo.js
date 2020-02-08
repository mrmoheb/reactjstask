import React from 'react';
class Todo extends React.Component{
    render(){
      return  (
      <li key={this.props.id} id={this.props.key}><input type="checkbox" defaultChecked = {this.props.completed} onChange={()=>this.props.todoChecked(this.props.id)} />{this.props.title}</li>
      );
    }
  }

  export default Todo;
import React from 'react';
class Post extends React.Component{
    render(){
      return  (
      <li
      key={this.props.id}
      className="list-group-item"
      id={this.props.key}>
        <h4>{this.props.title}</h4>
        <p>{this.props.body}</p>
      </li>
      );
    }
  }

  export default Post;
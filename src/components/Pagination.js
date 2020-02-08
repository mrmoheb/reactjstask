import React from 'react';
class Pagination extends React.Component{
    pages = ()=>{
      let res = [];
      for(let i = 0;i<this.props.numberOfPosts/10;i++){
        res.push(<li key={i} className="page-item"><a className="page-link" onClick={()=>this.props.changePage(i)} href="#">{i+1}</a></li>)
      }
      return <ul className="pagination">{res}</ul>;
    }
    render(){
      return (
        <div>
       {this.pages()}
       </div>
      );
    }
  }
  export default Pagination;
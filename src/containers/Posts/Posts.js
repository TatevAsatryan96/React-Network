import React, { Component } from "react";
import {connect} from "react-redux" ;
import { AppContext } from "Context/AppContext";
import Post from "components/Post/Post";
import PostModal from 'components/PostModal/PostModal';
import service from "api/service";
import fbService from "api/fbService";
import {actionTypes} from "Context/actionTypes";

import load from "assets/load.gif";
import noResults from "assets/noResults.jpg";

import './Posts.scss';
import { reduxActionTypes } from "reducers/reduxActionTypes";

const limit = 8;

export class Posts extends Component {

  
  state = {
    //posts:null,
    start:0,
    hasMore:true,
    loading:false,
    isCreateModalOpen:false,
    titleValue:"",
    bodyValue:""
  }

  static contextType = AppContext;

    
  componentDidMount() {
    
    if(!this.props.posts){

      fbService.getPosts()
      .then(data => {
       // this.context.dispatch({ type:actionTypes.SET_POSTS, payload:{posts:data} })
       this.props.setReduxPosts(data);
                    
        
      })
    }
  }
  updatePost = ()=>{
    service.updatePost(5,{title:'Updated Title'})
    .then(resJson => {
      const newPosts = this.state.posts.map(el => {
        if(el.id === resJson.id){
          return resJson;
        }
        return el;
      })

      this.setState ({
        posts:newPosts
      })

    })

  }

  createPost = ()=>{
    const newPost = {
      title:this.state.titleValue,
      body:this.state.bodyValue,
      userId:1
    }
    fbService.createPost(newPost)

    .then(resJson =>{
      
      this.toggleCreateModal();
      this.props.history.push(`/posts/${resJson.id}`)
    })

  }

  deletePost = (id)=>{
    service.deletePost(id)
    .then(() => {
      const afterDelPosts = this.state.posts.filter(el => {
        return el.id !== id;
      })
      this.setState ({
        posts:afterDelPosts
      })
        
    })
    .catch(err =>{
      console.log(err);
    })

  }

  removePost = (id)=>{
    const {start} = this.state
    fbService.removePost(id)
    .then(() => {
      fbService.getPosts(0,start !==0 ? start +limit : limit)
      .then(res=>{
        this.props.setReduxPosts(res);
      })
      
        
    })
    .catch(err =>{
      console.log(err);
    })

  }

  // removePost = (id)=>{
  //   fbService.removePost(id)
  //   .then(() => {
  //     const afterDelPosts = this.state.posts.filter(el => {
  //       return el.id !== id;
  //     })
  //     this.setState ({
  //       posts:afterDelPosts
  //     })
        
  //   })
  //   .catch(err =>{
  //     console.log(err);
  //   })

  // }
  

  getMore =()=>{
    const newStart = this.state.start + limit + 1;
    this.setState({
      start:newStart,
      loading:true
    })
    fbService.getPosts(newStart,newStart + limit)
      .then(resJson => {
        //this.context.dispatch({type:actionTypes.GET_MORE_POSTS,payload:{posts:resJson}})
        this.props.hasMoreReduxPosts(resJson.length <limit ? false : true)
        this.props.getMoreReduxPosts(resJson);
        this.setState({
          //hasMore: resJson.length <limit ? false : true,
          loading:false,
        })
      })
  }

  toggleCreateModal = ()=>{
    this.setState(prev =>({ isCreateModalOpen : !prev.isCreateModalOpen}))
  }

  changeValue = (e)=>{
    const {name,value} = e.target;
    this.setState({
        [name]:value
    })
}

  render() {
    const {loading,isCreateModalOpen,titleValue,bodyValue} = this.state;
    //const {state:{posts}} = this.context;
    const {posts ,hasMore} = this.props;

    if(!posts){
      return <div><img src ={load}></img></div>
    }

    if(!(posts.length > 0)){
      return <div><img src = {noResults}></img>No results</div>
    }
    
    return (
      <div className = "app-posts">
        <div className = "app-posts__container">
          {
            posts.map(post =>{
              return <Post 
                        key = {post.id}
                        post = {post}
                        className = "app-posts__container__post"
                        isLink = {true}
                        remove = {()=>this.removePost(post.id)}
                      />
            })
          }
        
        </div>
        {hasMore && <div>{loading ? <img src ={load}></img>: <button onClick = {this.getMore} disabled = {loading} className = "app-posts__btn-getMore">GET MORE</button>}</div>}

        <button onClick={this.toggleCreateModal} className = "app-posts__btn__create"> Create Post </button>
        {/* <button onClick={this.updatePost} className = "app-posts__btn__update"> Update Post </button>
        <button onClick={()=>this.deletePost(5)} className = "app-posts__btn__delete"> Delete Post </button> */}
        <PostModal
          action = {this.createPost}
          bodyValue = {bodyValue}
          titleValue = {titleValue}
          changeValue = {this.changeValue}
          isOpen = {isCreateModalOpen}
          onClose = {this.toggleCreateModal}
          buttonTitle = "Create"

        />

      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    posts:state.posts,
    hasMore:state.hasMore
  }
}

const mapDispatchToProps ={
  setReduxPosts:(posts)=>({
    type:reduxActionTypes.SET_POSTS,
    payload:{
      posts,
    }
  }),
  getMoreReduxPosts:(posts)=>({
    type:reduxActionTypes.GET_MORE_POSTS,
    payload:{
      posts,
    }
  }),
  hasMoreReduxPosts:(hasMore)=>({
    type:reduxActionTypes.HAS_MORE_POSTS,
    payload:{
      hasMore,
    }
  })
}

export default connect(mapStateToProps,mapDispatchToProps) (Posts);

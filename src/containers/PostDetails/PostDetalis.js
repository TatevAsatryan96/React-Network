import React, { Component } from 'react';


import { AppContext } from 'Context/AppContext';
import Post from 'components/Post/Post';
import PostModal from 'components/PostModal/PostModal';
import fbService from 'api/fbService';



import load from "assets/load.gif";
import { actionTypes } from 'Context/actionTypes';

export class PostDetails extends Component {

    state = {
        post:null,
        isEditModalOpen:false,
        titleValue:'',
        bodyValue:''
    }

    static contextType = AppContext;

    componentDidMount (){
        fbService.getPost(this.props.match.params.postId)
        .then(resJson => {
            this.setState({
              post: resJson,
              titleValue: resJson.title,
              bodyValue:resJson.body , 
            })
        })
      .catch(err =>{
        console.log(err);
        this.props.history.push('/')
      })
    }

    toggleCloseModal = ()=>{
        this.setState(prevState =>({
            isEditModalOpen: !prevState.isEditModalOpen
        }))
    }

    savePost = ()=>{
        fbService.updatePost({
            ...this.state.post,
            title:this.state.titleValue,
            body:this.state.bodyValue
        }).then(res=>{
            const updatedPost = {...this.state.post, title:this.state.titleValue, body:this.state.bodyValue}
            this.setState({
                post: updatedPost,
                isEditModalOpen: false
            })
            const {state:{posts}} = this.context;
            if (posts && posts.find(el => el.id ===this.state.post.id)){
                this.context.dispatch({type:actionTypes.UPDATE_POST, payload:{post:updatedPost}})
            }
        })
        .catch(err =>{
            console.log(err);
            this.toggleCloseModal();
        })
        
        
    }

    changeValue = (e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }



    render() {
        const {post,isEditModalOpen,titleValue,bodyValue} = this.state;
        if(!post){
            return <div><img src ={load}></img></div>
        }
        return (
            <div className = "app-postDetails">
                <Post
                    post = {post}
                    edit = {this.toggleCloseModal}
                />
                <PostModal
                    action = {this.savePost}
                    bodyValue = {bodyValue}
                    titleValue = {titleValue}
                    changeValue = {this.changeValue}
                    isOpen = {isEditModalOpen}
                    onClose = {this.toggleCloseModal}
                    buttonTitle = "SAVE"

                />
                
            </div>
        )
    }
}

export default PostDetails;

import React, { Component } from 'react'

import Post from 'components/Post/Post'
import service from 'api/service'
import fbService from 'api/fbServise';

import './Posts.scss';
const limit = 9;
export class Posts extends Component {
    state = {
        posts: null,
        start: 0,
        hasMore: true,
        loading: false
    }
    
    componentDidMount() {
        fbService.getPosts()
        .then(data => {
          this.setState({
           posts:data,
                      
          })
        })
      }
    updataPost = () => {
        service.updataPost(5, {title: "Another Title"})
            .then(data => {
                const newPosts = this.state.posts.map(el => {
                    if(el.id === data.id){
                        return data;
                    }
                    return el
                })

                this.setState({
                    posts: newPosts
                })
            })
    }

    createPost = () => { 
       fbService.createPost({
            title: 'Awesome Ttitle',
            body: 'Awesome Body',
            userId: 1
        })
            .then(data => {
                this.setState({
                    posts: [...this.state.posts, data]
                })
            })
    }

    deletePost = (id) => {
        service.deletePost(id)
            .then(data => {
                this.setState({
                    posts: this.state.posts.filter((el) => {
                        return el.id !== id
                    })
                })
            })
    }
    removePost = (id)=>{
        fbService.removePost(id)
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
      
    
      getMore =()=>{
        const newStart = this.state.start + limit + 1;
        this.setState({
          start:newStart,
          loading:true
        })
        fbService.getPosts(newStart,newStart + limit)
          .then(resJson => {
            this.setState({
              posts:[...this.state.posts,...resJson],
              hasMore: resJson.length <limit ? false : true,
              loading:false,
            })
          })
      }

    render() {
        const {hasMore,loading,posts} = this.state;

        if(!posts){
          return <div></div>
        }
    
        if(!(posts.length > 0)){
          return <div>No results</div>
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
                        <div className="app-posts_buttons">
                            
                            {hasMore &&  <button className='app-posts_getmore' onClick={this.getMore} disabled={loading}>{loading ? 'Loading...' : 'Get More'}</button>}
                            
                            <button  className='app-posts_updatepost' onClick={this.updataPost}>Update Post</button>
                            <button  className='app-posts_createpost' onClick={this.createPost}>Create Post</button>
                            <button  className='app-posts_deletepost'onClick={() => this.deletePost(5)}>Delete Post</button>
                        </div>
            
            </div>
        )
    }
}

export default Posts
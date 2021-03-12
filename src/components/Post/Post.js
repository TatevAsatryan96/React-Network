  
import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'components/Link/Link';
import Button from "@material-ui/core/Button";

import './Post.scss';
const Post = ({post, className ="",isLink = false,edit = ()=>{},
remove=()=>{} } ) => {
    const removeHandler = (e) => {
        e.preventDefault();
        remove();
    }
  
    const Wrapper = ({children}) =>{
        const postClassName = `app-post ${className}`;
        return isLink ? (
            <Link className = {postClassName} to = {`/posts/${post.id}`}>
                  <Button variant="contained" color="primary"onClick={remove}>
                      Remove
                  </Button>
                    {children}
            </Link>
        ) : (
                <div className = {postClassName}> 
                    <Button variant="contained" color="primary" onClick = {edit}>
                        <EditIcon/> 
                        <span className = "app-post__edit">Update</span>

                    </Button>
                    {children} 
                </div>
            )
    }
    return (
        <Wrapper>
       
            <div className={`app-post ${className}`}>
                <p className="app-post_title">{post.title}</p>
                <p className="app-post_body">{post.body}</p>
            </div>
            
        </Wrapper>   

    )
    
}

Post.protoType = {
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    isLink:PropTypes.bool,
    edit:PropTypes.func,
    remove:PropTypes.func
}

export default Post
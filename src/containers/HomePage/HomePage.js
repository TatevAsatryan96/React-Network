import React, { Component } from 'react'
import postsMockup from'data-mockup/posts.mockup'
import fbService from 'api/fbServise'

export default class HomePage extends Component {
 /*componentDidMount(){
     fetch('https://react-learn-posts-default-rtdb.firebaseio.com/posts.json',{
         method:'PUT',
         body:JSON.stringify(postsMockup.map(el=>({...el,id:el.id-1})))
     })

    .then(res=>res.json())
    .then(data=>console.log(data))
    }*/

    render() {
        return (
            <div>
                Home page
            </div>
        )
    }
}

import React, { Component } from 'react'

import {connect} from 'react-redux';

export class Homepage extends Component {

    render() {
        return (
            <div>
                <button onClick = {this.props.incrementCount}>Increment</button>
                <span>{this.props.count}</span>
                <button onClick = {this.props.decrementCount}>Decrement</button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        count:state.count
    }
}

const mapDispatchToProps = {
    incrementCount:()=>({type:'INCREMENT_COUNT'}),
    decrementCount:()=>({type:'DECREMENT_COUNT'})
}

export default connect (mapStateToProps,mapDispatchToProps)(Homepage);
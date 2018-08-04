import React, { Component } from 'react';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import {createGroup} from '../actions';
function mapStateToProps(state) {
    return {
        group: state.group
    };
}
const socket = io('http://reactify-socketserver.herokuapp.com/');
socket.on('connect', ()=>{
    
})
let accessCode ;
class Owner extends Component {
    componentDidMount(){
        this.socket = io('http://reactify-socketserver.herokuapp.com/');
        this.socket.emit('createGroup');
        this.socket.on('createGroup', (data)=>{
            this.props.createGroup(data);
            console.log(data);
            //console.log(this.props);
        });
    }
    render() {
        return (
            <div className="center-box center-align">
            <h1>People can you at: {accessCode}</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{createGroup}
)(Owner);
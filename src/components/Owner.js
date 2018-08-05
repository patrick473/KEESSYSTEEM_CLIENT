import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

import {createGroup} from '../actions';

function mapStateToProps(state) {
    return {
        group: state.group
    };
}

let accessCode ;
class Owner extends Component {
    componentDidMount(){
       
        this.props.socket.emit('createGroup');
        this.props.socket.on('createGroup', (data)=>{
            this.props.createGroup(data);
            //console.log(data);
            console.log(this.props.group);
        });
    }
    render() {
        const {accessCode} = this.props.group;
        return (
            <div className="center-box center-align">
            <h1>People can join you at: {accessCode}</h1>
            <Link to="/" > Go Back </Link>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{createGroup}
)(Owner);
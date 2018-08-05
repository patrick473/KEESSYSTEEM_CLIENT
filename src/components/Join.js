import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

import {createGroup} from '../actions';

function mapStateToProps(state) {
    return state;
}


class Join extends Component {
    constructor(props){
        super(props);
        this.state = {accessCode:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleSubmit(event){
        alert('accecscode submitted: '+this.state.value);
        event.preventDefault();
    }
    componentDidMount(){
       
      
    }
    render() {
       
        return (
            <div className="center-box center-align">
            <h1>You can join a room by using the accesscode provided by the owner.</h1>
            <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="accesscode" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="submit"/>
            </form>
            <Link to="/" > Go Back </Link>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{createGroup}
)(Join);
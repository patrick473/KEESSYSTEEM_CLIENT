import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {createGroup} from '../actions';

function mapStateToProps(state) {
    return {
        group: state.group
        
    };
}


class Owner extends Component {
    constructor(props){
        super(props);
        this.state = {users: 0, ingame:false};

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    componentDidMount(){
       const {socket} = this.props;
        socket.emit('createGroup');
        socket.on('createGroup', (data)=>{
            this.props.createGroup(data);
            //console.log(data);
            console.log(this.props.group);
        });
        socket.on('joinGroup',(message)=>{
            toast(message);
            this.setState({users: this.state.users+ 1})
        })
        socket.on('startGame',(message)=>{
            toast(message);
            this.setState({ingame:true});
        });
        socket.on('startGameFailed', (message)=>{
            toast(message);
        });
        socket.on('stopGame',(message)=>{
            toast(message);
            this.setState({ingame:false});
        })
    }
    renderCorrectButton(){
        if(!this.state.ingame){
            if(this.state.users == 0){
        return <button disabled className="btn-large amber darken-4 buttoncenter " onClick={this.handleStart}>Start game</button>
            }
            else{
                return <button  className="btn-large amber darken-4 buttoncenter " onClick={this.handleStart}>Start game</button>
          
            }
    }
        else{
            return <button className="btn-large amber darken-4 buttoncenter " onClick={this.handleStop}>Stop game</button>
        }
    }
    handleStart(){
        
        this.props.socket.emit('startGame',this.props.group._id);
    }
    handleStop(){
        this.props.socket.emit('stopGame',this.props.group._id);
    }
    render() {
        const {accessCode} = this.props.group;

        return (
            <div className="center-box center-align">
            <ToastContainer/>
            <h1>People can join you at: {accessCode}</h1>
            <p>Users in group:{this.state.users}</p>
            {this.renderCorrectButton()}
            <br/>
            <Link to="/" > Go Back </Link>

            
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{createGroup}
)(Owner);
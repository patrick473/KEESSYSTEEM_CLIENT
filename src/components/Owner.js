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
        this.state = {users: 0, ingame:false, delay:0};

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            if(this.state.users === 0){
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
        const startObject ={
            groupid:  this.props.group._id,
            delay: this.state.delay
        }
        this.props.socket.emit('startGame',startObject);
    }
    handleStop(){
        this.props.socket.emit('stopGame',this.props.group._id);
    }
    handleChange(event){
        this.setState({delay:event.target.value});
        console.log(this.state.delay);
    }
    render() {
        const {accessCode} = this.props.group;

        return (
            <div className="center-box center-align">
            <ToastContainer/>
            <h1>People can join you at: {accessCode}</h1>
            <label htmlFor="range">Delay: </label><input id="range" type="range" defaultValue={0} onChange={this.handleChange} style={{width:300}} min={0} max={20} step={0.5}/>
            <h5>Delay in seconds: {this.state.delay}</h5>
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
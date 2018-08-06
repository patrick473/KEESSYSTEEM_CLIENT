import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {joinGroup} from '../actions';


function mapStateToProps(state) {
    return state;
}


class Join extends Component {
    constructor(props){
        super(props);
        this.state = {accessCode:'',redirect:false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({accessCode: event.target.value});
    }
    handleSubmit(event){
        this.props.socket.emit('joinGroup',this.state.accessCode);
        event.preventDefault();
    }
    componentDidMount(){
       
      this.props.socket.on('joinGroup', (data)=>{
        this.setState({redirect:true});
        this.props.joinGroup(data);
      });
      this.props.socket.on('joinGroupFailed', (message)=>{
        toast(message);
      });
    }
    redirectFunction(){
        if(this.state.redirect){
            return <Redirect to="/ingame"/>
        }
        
    }
    render() {
       
      

        return (
            <div className="center-box center-align">
            <ToastContainer/>
            <h1>Join a room by using <br/>a given accesscode</h1>
            <form onSubmit={this.handleSubmit}>
            <div className="container" >
            <input type="text" maxLength="4" style={{fontSize: 50,width:'50%',padding:20}} placeholder="code" value={this.state.value} onChange={this.handleChange}/>
            <br/>
            
            <input type="submit" className="btn" value="submit"/>
            </div>
            </form>
            <Link to="/"> Go Back </Link>
         
            {this.redirectFunction()}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{joinGroup}
)(Join);
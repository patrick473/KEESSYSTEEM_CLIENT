import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


function mapStateToProps(state) {
    return state;
}


class Join extends Component {
    constructor(props){
        super(props);
        this.state = {playing:'waiting'};
        
    }
    
    componentDidMount(){
       this.props.socket.on('startGame', (data)=>{
           this.setState({playing:'ingame'})
       })
     
    }
    render() {
        
        switch (this.state.playing) {
            case 'waiting':
            return (
            
                <div className="center-box center-align">
                <h1> Waiting for game to start.</h1>
                <Link to="/" > Go Back </Link>
                </div>
                
            );
            
            case 'ingame':
            return(
                <div className="big-black-div"></div>
            );
            case 'reacting':
            return(
                <div className="big-white-div"></div>
            )
                
        
            default:
                break;
        }
      

       
    }
}

export default connect(
    mapStateToProps,{}
)(Join);
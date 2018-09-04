import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import delay from 'delay';
import 'react-toastify/dist/ReactToastify.css';


function mapStateToProps(state) {
    return {
        group: state.group
        
    };
}


class Ingame extends Component {
    constructor(props){
        super(props);
        this.state = {playing:'waiting',delay:0};
        this.handleReaction = this.handleReaction.bind(this);
        this.setStateToReacting = this.setStateToReacting.bind(this);
    }
    
     componentDidMount(){
        const {socket} = this.props;
       socket.on('startGame', (data)=>{
           this.setState({playing:'ingame',delay:data.delay})
           console.log(this.state)
       });
      socket.on('reactGame',(data)=>{
           
                delay(this.state.delay * 1000).then(()=>{
                    
                        this.setStateToReacting();
                    
                })
              
          
           
           
       });
       socket.on('reactSuccess',(data)=>{
        this.setState({playing:'ingame'});
    });
    socket.on('stopGame',(data)=>{
        this.setState({playing:'waiting'});
    })
     
    }
    setStateToReacting(){
        console.log('beep');
        this.setState({playing:'reacting'})
    }
    handleReaction(){
       
        this.props.socket.emit('reactGame',this.props.group._id);
        
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
                <div className="big-white-div" onClick={this.handleReaction}></div>
            )
                
        
            default:
                break;
        }
      

       
    }
}

export default connect(
    mapStateToProps,{}
)(Ingame);
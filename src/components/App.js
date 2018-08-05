import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Helmet from 'react-helmet';
import Landing from './Landing';
import Owner from './Owner';
import Join from './Join';
import Header from './includes/Header';
import io from 'socket.io-client';
const socket = io('http://reactify-socketserver.herokuapp.com/');

function OwnerPage(){
  return  <Owner socket={socket}/>
  
};
function JoinPage(){
  return <Join socket={socket}/>
}
class App extends Component {
   
  render() {
   
    return (
      <div>
      <Helmet bodyAttributes={{style: 'background-color : #fff3e0'}}/>
      <BrowserRouter>
      <div >
        <Header />
        <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/owner" component={OwnerPage} />
        <Route path="/join" component={JoinPage}/>
        </Switch>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

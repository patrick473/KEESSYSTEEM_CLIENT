import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
function mapStateToProps(state) {
    return {

    };
}

class Landing extends Component {
    render() {
        return (
            <div className="landing-box center-align">
            <h1 >Reactify</h1>   
            <div className="row">
            <Link to="/owner" className="btn-large amber darken-4 buttoncenter ">Create a game</Link>
            </div>
            <div className="row">
            <Link to="/join" className="btn-large amber darken-4 buttoncenter">Join a game</Link>
            </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Landing);
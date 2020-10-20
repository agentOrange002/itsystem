import React, { Component } from 'react';

const MyStyle = {
    name1: {'marginRight': '5px'},
    name2:{'marginLeft': '5px'},
    color:{backgroundColor:'#191919'}
};

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer" style={MyStyle.color}>
                <span className="footer-text" style={MyStyle.name1}>Issue Tracking System</span>
                <img src="assets/layout/images/logo-white.svg" alt="" width="80"/>
                <span className="footer-text" style={MyStyle.name2}>2020 FruitAgents Solutions Inc.</span>
            </div>
        );
    }
}
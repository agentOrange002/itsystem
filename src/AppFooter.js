import React, { Component } from 'react';

const MyStyle = {
    name1: {'marginRight': '5px'},
    name2:{'marginLeft': '5px'} 
};

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={MyStyle.name1}>Information Technology Support System</span>
                <img src="assets/layout/images/logo.svg" alt="" width="80"/>
                <span className="footer-text" style={MyStyle.name2}>2020 FruitAgents Solutions Inc.</span>
            </div>
        );
    }
}
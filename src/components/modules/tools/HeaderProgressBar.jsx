import React from 'react';
import LoadingBar from 'react-redux-loading-bar'

const HeaderProgressBar = (props) => {   
    return(<LoadingBar scope={props.nameofbar} style={{ backgroundColor: 'blue', height: '6px'}}/>);
}

export default HeaderProgressBar;
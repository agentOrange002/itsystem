import React, { Component } from 'react';
import { connect } from 'react-redux';

class IssueLogsPage extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <div className='layout-main-inside'>

            </div>
            </>
         );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { issueid } = ownProps.match.params;
    return {
        MYDOCUMENTS: state.MYDOCUMENTS.mydocumentResponse[issueid]
    };
};
 
export default connect(mapStateToProps, null)(IssueLogsPage);
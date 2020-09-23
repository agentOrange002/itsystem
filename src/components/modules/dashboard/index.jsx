import React, { Component } from 'react';
import SupportDashboard from './SupportDashboard';
// import UserDashboard from './UserDashboard';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="p-grid p-fluid dashboard">
                <SupportDashboard />
              {/* //  <UserDashboard />         */}
            </div>
        );
    }
}
 
export default Dashboard;
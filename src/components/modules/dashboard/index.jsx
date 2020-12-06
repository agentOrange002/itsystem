import React, { Component } from 'react';
import SupportDashboard from './SupportDashboard';

class Dashboard extends Component {  

    render() { 
        return ( 
          <div className='layout-main-inside'>
            <div className="p-grid p-fluid dashboard">
                <SupportDashboard />
              {/* //  <UserDashboard />         */}
            </div>
        </div>
        );
    }
}
 
export default Dashboard;
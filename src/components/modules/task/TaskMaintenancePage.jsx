import React, { Component } from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import history from "../../../routes/history";

const urlparam = `${window.location.origin}/#/app/taskmaintenance/`;

const MyStyle = {
    paddingB: {paddingBottom: '.5em'},
    paddingT: {paddingTop: '.5em'} 
}

class TaskMaintenancePage extends Component {
    state = { 
        breadcrumdItems: [
            {label: 'Task'},
            {label: 'Task Maintenance'},
            // {label:'Issue Details'},           
            // {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
        ],
        home: {
            icon: 'pi pi-home', command: () => {history.push('/app/');}
        },
        tieredItems: [
            {
                label: 'Issue',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New Issue',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Issues',
                        icon: 'pi pi-fw pi-table',
                        url: `${urlparam}`
                    }
                ]
            },
            {
                label: 'Supports',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Assigned Support',
                        icon: 'pi pi-fw pi-user-plus',
                        url: `${urlparam}`

                    },
                    {
                        label: 'Removed Support',
                        icon: 'pi pi-fw pi-user-minus',

                    },

                ]
            },
            {
                label: 'Category',
                icon: 'pi pi-fw pi-folder',
                url: `${urlparam}`                
            },
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print'
            }
        ]

     }
    render() { 
        return ( 
            <div className="p-grid p-fluid">
                <div className="p-col-12" >
                    <div style={MyStyle.paddingB}>
                        <BreadCrumb model={this.state.breadcrumdItems} home={this.state.home} />
                    </div>
                    <div>
                        <Menubar model={this.state.tieredItems}>                            
                           {/* // <Button label="Assigned Support" icon="pi pi-user-plus" style={{marginLeft:4}}/> */}
                        </Menubar>
                    </div>
                    <div style={MyStyle.paddingT}>
                       
                    </div>
                </div>
            </div>            
         );
    }
}
 
export default TaskMaintenancePage;
import React, { Component } from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Panel} from 'primereact/panel';
import history from "../../../routes/history";

const urlparam = `${window.location.origin}/#/app/taskmaintenance/`;

const MyStyle = {
    paddingB: {paddingBottom: '.5em'},
    paddingT: {paddingTop: '.5em'} 
}

class TaskMaintenance extends Component {
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
                        <Panel header="Godfather I" toggleable={true} collapsed={this.state.panelCollapsed} onToggle={(e) => this.setState({panelCollapsed: e.value})}>
                        The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.
                        His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.
                        Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,
                        kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                         </Panel>
                    </div>
                </div>
            </div>            
         );
    }
}
 
export default TaskMaintenance;
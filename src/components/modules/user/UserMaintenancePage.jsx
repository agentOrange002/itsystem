import React, { Component } from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Menubar} from 'primereact/menubar';
import {Switch,Route} from 'react-router-dom';
import history from "../../../routes/history";
import UserDataTable from './UserDataTable';

const urlparam = `${window.location.origin}/#/app/usermaintenance/`;

const MyStyle = {    
    paddingT : {
        paddingTop: '.5em'
    } ,  
    menubar:{background: '#191919',height:'50px'},
    breadcrumbBG:{     
        borderStyle: 'solid',
        backgroundColor:'#000066',
        color:'#000066'
    },
    breadcrumb:{
        background:'#000066',
        borderColor:'#000066'    
    }
}

class UserMaintenance extends Component {
    state = {
        breadcrumdItems: [
            {label: 'Users'},
            {label: 'User Maintenance'}
        ],
        home: {
            icon: 'pi pi-home', command: () =>
            {
                history.push('/app/');
            }
        },

        tieredItems: [
            {
                label: 'User',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New User',
                        icon: 'pi pi-fw pi-plus',
                        url: `${urlparam}newuser`
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'All Users',
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
                        url: `${urlparam}assignedsupport`

                    },
                    {
                        label: 'Removed Support',
                        icon: 'pi pi-fw pi-user-minus',

                    },

                ]
            },
            {
                label: 'Print',
                icon: 'pi pi-fw pi-print'
            }
        ]

    };

    render() { 
        return ( 
            <>
             <div style={MyStyle.breadcrumbBG}> 
                <BreadCrumb style={MyStyle.breadcrumb} model={this.state.breadcrumdItems} home={this.state.home} />
            </div>  
            <div className='layout-main-inside'>           
            <div className="p-grid p-fluid">
                <div className="p-col-12" >   
                    <Menubar style={MyStyle.menubar} model={this.state.tieredItems} />                       
                    <div style={{paddingTop: '.5em'}}>
                        <Switch>
                            <Route path="/app/usermaintenance/" exact component={UserDataTable} />                           
                          
                        </Switch>
                    </div>           
                </div>                          
            </div>
            </div>
            </>
         );
    }
}
 
export default UserMaintenance;
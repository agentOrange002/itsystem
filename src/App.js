import React, {Component} from 'react';
import classNames from 'classnames';
import AppTopbar from './AppTopbar';
import {AppFooter} from './AppFooter';
import {AppMenu} from './AppMenu';
import AppProfile from './AppProfile';
import {Route,Switch,Redirect} from 'react-router-dom';
import {Dashboard} from './components/js/Dashboard';
import {FormsDemo} from './components/js/FormsDemo';
import {SampleDemo} from './components/js/SampleDemo';
import {DataDemo} from './components/js/DataDemo';
import {PanelsDemo} from './components/js/PanelsDemo';
import {OverlaysDemo} from './components/js/OverlaysDemo';
import {MenusDemo} from './components/js/MenusDemo';
import {MessagesDemo} from './components/js/MessagesDemo';
import {ChartsDemo} from './components/js/ChartsDemo';
import {MiscDemo} from './components/js/MiscDemo';
import {EmptyPage} from './components/js/EmptyPage';
import {Documentation} from "./components/js/Documentation";

import IssueMaintenancePage from './components/modules/issue/IssueMaintenancePage';
import IssueDetailsPage from './components/modules/issue/IssueDetailsPage';
import UserMaintenancePage from './components/modules/user/UserMaintenancePage';
import history from "./routes/history";

import DataTableDemo from './components/modules/public/Test';
import AccountProfile from './components/modules/account/AccountProfile';
import TicketMaintenancePage from './components/modules/ticket/TicketMaintenancePage'
import TaskMaintenancePage from './components/modules/task/TaskMaintenancePage';
import SupportDashboard from './components/modules/dashboard';

import JimRoute from './routes/jimroute';
import UnauthorizedPage from './components/modules/error/UnauthorizedPage';
import NotFoundPage from './components/modules/error/NotFoundPage';

class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }
       
        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {history.push('/app/');}},
            {label: 'Support Dashboard', icon: 'pi pi-fw pi-home', command: () => {history.push('/app/supportdashboard');}},
            // {
            //     label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
            //     items: [
            //         {label: 'Static Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'static'}) },
            //         {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'overlay'}) }
            //     ]
            // },

            // {
            //     label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
            //     items: [
            //         {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'dark'}) },
            //         {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'light'}) }
            //     ]
            // },
            {
                label: 'My Documents', 
                icon: 'pi pi-fw pi-folder', 
                items:  [
                    {label: 'My Issues', icon: 'pi pi-fw pi-file', to: '/app/#'},
                    {label: 'My Tickets', icon: 'pi pi-fw pi-file', to: '/app/#'},
					{label: 'My Tasks', icon: 'pi pi-fw pi-file', to: '/app/#'},
                ]
            },   
            {
                label: 'Issues', icon: 'pi pi-fw pi-desktop', 
                items:  [
					{label: 'Issue Maintenance', icon: 'pi pi-fw pi-file', to: '/app/issuemaintenance'},
					{label: 'Issue Details', icon: 'pi pi-fw pi-file', to: '/app/issuedetails'},
                ]
            },    
            {
                label: 'Tickets', icon: 'pi pi-fw pi-desktop', 
                items:  [
					{label: 'Ticket Maintenance', icon: 'pi pi-fw pi-file', to: '/app/ticketmaintenance'},
					{label: 'Ticket Details', icon: 'pi pi-fw pi-file', to: '/app/#'},
                ]
            },      
           
            {
                label: 'Tasks', icon: 'pi pi-fw pi-desktop', 
                items:  [
					{label: 'Tasks Maintenance', icon: 'pi pi-fw pi-file', to: '/app/taskmaintenance'},
					{label: 'Tasks Details', icon: 'pi pi-fw pi-file', to: '/app/#'},
                ]
            },
            {
                label: 'Reports', icon: 'pi pi-fw pi-folder', 
                items:  
                [
                    {label: 'Issue List Report', icon: 'pi pi-fw pi-file-pdf', to: '/app/#'},
                    {label: 'Issue Information Report', icon: 'pi pi-fw pi-file-pdf', to: '/app/#'},
                    {label: 'User List Report', icon: 'pi pi-fw pi-file-pdf', to: '/app/#'},
                    {label: 'User Information Report', icon: 'pi pi-fw pi-file-pdf', to: '/app/#'},
					
                ]
            },
            {
                label: 'Users Administration', icon: 'pi pi-fw pi-id-card', 
                items:  [
					{label: 'User Maintenance', icon: 'pi pi-fw pi-file', to: '/app/usermaintenance'},
					{label: 'User Details', icon: 'pi pi-fw pi-file', to: '/app/#'},
                ]
            },
            {
                label: 'Roles Administration', 
                icon: 'pi pi-fw pi-users', 
                items:  [
                    {label: 'Roles Maintenance', icon: 'pi pi-fw pi-file', to: '/app/#'},
                    {label: 'Authority Maintenance', icon: 'pi pi-fw pi-file', to: '/app/#'},
					{label: 'Roles Details', icon: 'pi pi-fw pi-file', to: '/app/#'},
                ]
            },
            {
                label: 'Test Pages', 
                icon: 'pi pi-fw pi-play', 
                items:  [
                    {label: 'Test DataTable', icon: 'pi pi-fw pi-question', to: '/app/testdatatable'},                    
                ]
            },
            {
                label: 'Components', icon: 'pi pi-fw pi-globe', badge: '9',
                items: [
					{label: 'Sample Page', icon: 'pi pi-fw pi-th-large', to: '/app/sample'},
					{label: 'Forms', icon: 'pi pi-fw pi-file', to: '/app/forms'},
					{label: 'Data', icon: 'pi pi-fw pi-table', to: '/app/data'},
					{label: 'Panels', icon: 'pi pi-fw pi-list', to: '/app/panels'},
					{label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/app/overlays'},
					{label: 'Menus', icon: 'pi pi-fw pi-plus', to: '/app/menus'},
					{label: 'Messages', icon: 'pi pi-fw pi-spinner',to: '/app/messages'},
					{label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/app/charts'},
					{label: 'Misc', icon: 'pi pi-fw pi-upload', to: '/app/misc'}
                ]
            },
            {label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => {window.location = "#/app/documentation"}},
            {label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {window.location = "https://github.com/primefaces/sigma"}},
           
        ];
    }

    // mdSideMenu(){
    //     let mdresult =  {
    //         label: 'My Documents', 
    //         icon: 'pi pi-fw pi-folder', 
    //         // items:  [
    //         //     {label: 'My Issues', icon: 'pi pi-fw pi-file', to: '/app/#'},
    //         //     {label: 'My Tickets', icon: 'pi pi-fw pi-file', to: '/app/#'},
    //         //     {label: 'My Tasks', icon: 'pi pi-fw pi-file', to: '/app/#'},
    //         // ]
    //     }
    //     let itemArray = [{label: 'My Issues', icon: 'pi pi-fw pi-file', to: '/app/#'}]     
    //     let newItemArray = null;
    //     if(true===true){
    //         newItemArray = [...itemArray, 
    //             {label: 'My Tickets', icon: 'pi pi-fw pi-file', to: '/app/#'},
    //             {label: 'My Tasks', icon: 'pi pi-fw pi-file', to: '/app/#'}
    //         ]
    //     } 
    //     else {
    //         newItemArray = itemArray;
    //     }


    //     mdresult.items = newItemArray;
    //     return mdresult; 
    // }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive) {
            this.addClass(document.body, 'body-overflow-hidden');
        }            
        else {
            this.removeClass(document.body, 'body-overflow-hidden');
        }          
    }  
    
    render() {
        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
           
           
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                
                <AppTopbar onToggleMenu={this.onToggleMenu}/>
               
                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div>
                    <AppProfile />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <div className="layout-main">
               
                <Switch>
                    <JimRoute path="/app/" exact component={Dashboard} checkName='Dashboard'/>
                    <Route path="/app/supportdashboard" component={SupportDashboard} />
                    <Route path="/app/forms" component={FormsDemo} />
                    <Route path="/app/sample" component={SampleDemo} />
                    <Route path="/app/data" component={DataDemo} />
                    <Route path="/app/panels" component={PanelsDemo} />
                    <Route path="/app/overlays" component={OverlaysDemo} />
                    <Route path="/app/menus" component={MenusDemo} />
                    <Route path="/app/messages" component={MessagesDemo} />
                    <Route path="/app/charts" component={ChartsDemo} />
                    <Route path="/app/misc" component={MiscDemo} />
                    <Route path="/app/empty" component={EmptyPage} />
                    <Route path="/app/documentation" component={Documentation} />
                    <JimRoute path="/app/issuemaintenance" component={IssueMaintenancePage} checkName='IssueMaintenance'/>
                    <JimRoute path="/app/issuedetails" component={IssueDetailsPage} checkName='IssueDetails' />
                    <Route path="/app/usermaintenance" component={UserMaintenancePage}  />
                    <Route path="/app/testdatatable" component={DataTableDemo} />
                    <Route path="/app/accountprofile" component={AccountProfile} />
                    <Route path="/app/ticketmaintenance" component={TicketMaintenancePage} />   
                    <Route path="/app/taskmaintenance" component={TaskMaintenancePage} /> 
                    <Route path="/app/unauthorized401" component={UnauthorizedPage} />     
                    <Route path="/app/notfound" component={NotFoundPage} />   
                    <Redirect from="/app/*" to="/app/notfound" />               
                </Switch>
                </div>

                <AppFooter />

                <div className="layout-mask"></div>
            </div>
        
        );
    }
}

export default App;

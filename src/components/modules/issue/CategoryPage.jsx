import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {connect} from 'react-redux';
import {getAllCategories} from '../../../redux/actions/CategoriesActions';
import _ from 'lodash';
import AddNewCategory from './AddNewCategory';
import UILoader from '../tools/UILoader';

const MyStyle = {
    HeaderDiv: {width: '100px'},
    HeaderButton: {float: 'left'},
    DialogStyle : {width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px'}
}

class CategoryPage extends Component {
    
    state = {
        data: [],
        selectedCategory: null,
        addDialog: false
    }

    componentDidMount() {
        if(_.isEmpty(this.props.CATEGORIES))
        {
            this.props.getAllCategories();     
        }         
    }
    
    showHeader = () => {
        return (
            // <div className="p-clearfix" s>
               
            // </div>
             <div className="p-grid p-fluid">
                <div className="p-col-12 p-md-6" style={MyStyle.HeaderDiv}>
                    <Button style={MyStyle.HeaderButton} label="Add" icon="pi pi-plus" onClick={this.addNew} />
                </div>            
             </div>
        );
    }

    addNew = (event) => {
        event.preventDefault();
        this.setState({addDialog: true});
    } 

    refreshTable = (event) => {
        event.preventDefault();
        this.props.getAllCategories();
    }

    render() {
        const paginatorLeft = <Button icon="pi pi-refresh" onClick={this.refreshTable} />;       
        return (           
            <UILoader blockui="CATEGORY_LOADING" unblockui={["CATEGORY_GET_ALL","CATEGORY_ERROR"]}>             
            <div className="content-section implementation">               
                <DataTable
                    value={this.props.CATEGORIES}
                    scrollable={true}
                    selectionMode="single"
                    header={this.showHeader()}
                    paginator={true}
                    paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    rows={10}
                    rowsPerPageOptions={[5, 10, 20]} >
                    <Column field="id" header="ID" style={{width: '100px'}} />
                    <Column field="categoryId" header="Category ID" style={{width: '100px'}} />
                    <Column field="name" header="Category Name" style={{width: '150px'}} />
                </DataTable>
                <Dialog
                    header="Add New Category"
                    visible={this.state.addDialog}
                    style={MyStyle.DialogStyle}
                    modal={true}
                    onHide={() => this.setState({addDialog: false})}>
                    <AddNewCategory hideThis={() => this.setState({addDialog: false})}/>                   
                </Dialog>
            </div>
            </UILoader>
        );
    }
}


const mapStateToProps = state => {
    return {
        CATEGORIES: Object.values(state.CATEGORIES.categoriesResponse)
    };
};

// const mapDispatchToProps = dispatch => ({
//     getAllCategories: () => dispatch(getAllCategories())
    
// });

const mapDispatchToProps = {getAllCategories};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
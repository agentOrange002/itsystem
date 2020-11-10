import React, { Component } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
//import { Rating } from 'primereact/rating';
import { connect } from 'react-redux';
import { getIssueDocuments } from '../../../redux/actions/MyDocumentActions';
import _ from 'lodash';

class IssueDataScroller extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        };  
    }

    async componentDidMount() {
   
        if (_.isEmpty(this.props.MYDOCUMENTS)) {
           await this.props.getIssueDocuments();
           
        }
    }

    itemTemplate(data)  {
        return (
            <div className="product-item">
                {/* <img src={`showcase/demo/images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} /> */}
                <div className="product-detail">
                    <span className="p-tag p-tag-success">{data.issueStatus}</span>
                    <div className="product-name">{data.subject}</div>
                    <div className="product-description">{data.description}</div>
                    <i className="pi pi-calendar product-category-icon"></i>{data.dateReported}<span className="product-category"></span>
                    
                   
                </div>
                <div className="product-action">
                    <span className="product-price"></span>
                    <Button icon="pi pi-search" label="View Tickets" disabled={ 'OUTOFSTOCK'}></Button>
                    <Button icon="pi pi-search" label="View Tasks" disabled={ 'OUTOFSTOCK'}></Button>
                   
                </div>
            </div>
        );
    }

    header(){
        return(
            <div style={{textAlign:'left'}}><h1>Users Issues</h1></div>
        );
    }

    render() {
        return (
            <div className="datascroller-demo">              
                <DataScroller value={this.props.MYDOCUMENTS} itemTemplate={this.itemTemplate} inline scrollHeight="500px"
                        rows={5} buffer={0.4} header={this.header()} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        MYDOCUMENTS: Object.values(state.MYDOCUMENTS.mydocumentResponse),       
    };
};

const mapDispatchToProps = { getIssueDocuments };


export default connect(mapStateToProps, mapDispatchToProps)(IssueDataScroller);
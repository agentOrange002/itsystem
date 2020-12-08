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
            items: []
        };
        this.itemTemplate = this.itemTemplate.bind(this);
    }

    async componentDidMount() {
        await this.props.getIssueDocuments();
        await this.setState({ items: this.props.MYDOCUMENTS });
    }

    itemTemplate(data) {
        return (
            <div className="item-item">
                {/* <img src={`showcase/demo/images/item/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} /> */}
                <div className="item-detail">
                    <span className="p-tag p-tag-success">{data.issueStatus}</span>
                    <div className="item-name">{data.subject}</div>
                    <div className="item-description">{data.description}</div>
                    <i className="pi pi-calendar item-category-icon"></i>{data.dateReported}<span className="item-category"></span>
                </div>
                <div className="item-action">
                    <span className="item-price"></span>
                    <Button icon="pi pi-search" label="View Logs"></Button>                    
                </div>
            </div>
        );
    }

    header() {
        return (
            <div style={{ textAlign: 'left' }}><h1>User Document Issues</h1></div>
        );
    }

    render() {
        return (
            <>
                {_.isEmpty(this.props.MYDOCUMENTS) ? null :
                    <div className="datascroller">
                        <DataScroller value={this.props.MYDOCUMENTS} itemTemplate={this.itemTemplate} inline scrollHeight="500px"
                            rows={5} buffer={0.1} header={this.header()} />
                    </div>
                }
            </>
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
import React, {Component} from 'react';
import {Messages} from 'primereact/messages';

import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import {InputText} from 'primereact/inputtext';

export class MessagesDemo extends Component {

    constructor() {
        super();

        this.showInfo = this.showInfo.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showWarn = this.showWarn.bind(this);
        this.showError = this.showError.bind(this);
    }

  
    
    
    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        
                        <Messages ref={(el) => this.messages = el} />
                      
            
                        <Button onClick={this.showInfo} label="Info" className="p-button-info" style={{width:'10em', marginRight:'.25em'}} />
                        <Button onClick={this.showSuccess} label="Success" className="p-button-success" style={{width:'10em', marginRight:'.25em'}} />
                        <Button onClick={this.showWarn} label="Warn" className="p-button-warning" style={{width:'10em', marginRight:'.25em'}} />
                        <Button onClick={this.showError} label="Error" className="p-button-danger"  style={{width:'10em', marginRight:'.25em'}} />
                    
                        <h1>Inline Message</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <Message severity="info" text="PrimeReact Rocks" />
                            </div>
                            <div className="p-col-12 p-md-3">
                                <Message severity="success" text="Record Saved" />
                            </div>
                            <div className="p-col-12 p-md-3">
                                <Message severity="warn" text="Are you sure?" />
                            </div>
                            <div className="p-col-12 p-md-3">
                                <Message severity="error" text="Field is required" />
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', paddingLeft: '.5em' }}>
                            <InputText placeholder="Username" className="p-error" style={{marginRight: '.25em'}} />
                            <Message severity="error" text="Field is required" />
                        </div>
                        <div style={{ marginTop: '30px', paddingLeft: '.5em' }}>
                            <InputText placeholder="Email" className="p-error" style={{marginRight: '.25em'}} />
                            <Message severity="error" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
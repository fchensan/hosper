import React from 'react';
import {Card} from 'antd';

class Whisper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props}
    }

    generateTitle() {
        if (this.state.isReceived) {
            return "From: " + this.state.userId;
        } else {
            return "To: " + this.state.userId;
        }
    }

    render() {
        return (
            <Card title={this.generateTitle()} style={{marginBottom: 10}}>
                <p>{this.state.message}</p>
            </Card>
        )
    }
}

export default Whisper;

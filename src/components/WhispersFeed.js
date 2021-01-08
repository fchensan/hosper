import React from 'react';
import Whisper from './Whisper';

class WhispersFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    generateWhisperComponent(whisper) {
        let isReceived = (whisper.sender != this.state.currentUserId);
        let userId = isReceived ? whisper.sender : whisper.receiver;

        return <Whisper
            isReceived={isReceived}
            userId={userId}
            message={whisper.content}
            />;
    }

    render() {
        return (
        <div>
            {this.state.whispers.map(whisper => this.generateWhisperComponent(whisper))}
        </div>
        );
    }
}

export default WhispersFeed;

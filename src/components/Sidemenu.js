import React from 'react';
import {Typography, Button} from 'antd';

const { Title } = Typography;

class Sidemenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    render () {
        return (
            <div>                
                <Title level={5}>Hi {this.state.username}!</Title>
                <Button type="link"> Change display name </Button>
                <br></br>
                <Button type="link" style={{width: '100%', textAlign:'left'}}> Log out </Button>
            </div>
        );
    };
}

export default Sidemenu;

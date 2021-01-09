import React from 'react';
import {Typography, Button} from 'antd';
import {Link} from 'react-router-dom';
const { Title } = Typography;

class Sidemenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    render () {
        return (
            <div>                
                <Title level={4} style={{paddingTop: 20, paddingLeft: 20}}>Hi {this.state.username}!</Title>
                {/* <Button type="link"> Change display name </Button> */}
                <br></br>
                <Button type="link" style={{width: '100%', textAlign:'left'}} onClick={this.props.onLogout}> Log out </Button>
            </div>
        );
    };
}

export default Sidemenu;

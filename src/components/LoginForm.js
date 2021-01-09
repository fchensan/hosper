import React from 'react';
import {Typography, Form, Input, Button} from 'antd';

import {Link} from 'react-router-dom';

const { Title } = Typography;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    render() {
        return (
            <div>
            <Title level={2}>
                Log in 
            </Title>
            <Title level={3}>
                Demo account: <br></br>username: d-104<br></br>password: abc123
            </Title>
            <Form
                className="message-box"
                layout="vertical"
                onFinish={this.state.onFinish}>
                <Form.Item
                    label="Username:"
                    name="username">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password:"
                    name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                   
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>    
                

                </Form.Item>
            </Form>
        </div> 
        );
    }
}

export default LoginForm;

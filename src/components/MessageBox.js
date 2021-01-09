import React from 'react';
import {Typography, Form, Input, Button} from 'antd';

import {Whispers} from '../api/Whispers';

const { Title } = Typography;

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    render() {
        return (
        <div>
            <Title level={4}>
                Send a message
            </Title>
            <Form
                className="message-box"
                layout="vertical"
                onFinish={this.props.onFormFinish}>
                <Form.Item
                    label="TO:"
                    name="to"
                    placeholder="d-100">
                    <Input placeholder="d-100"/>
                </Form.Item>
                <Form.Item
                    label="MESSAGE:"
                    name="message">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        );
    }
}

export default MessageBox;

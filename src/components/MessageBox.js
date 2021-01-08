import React from 'react';
import {Typography, Form, Input, Button} from 'antd';

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
                layout="vertical">
                <Form.Item
                    label="TO:"
                    name="to">
                    <Input />
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

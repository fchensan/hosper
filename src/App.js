import React from 'react';

import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';



import {Typography, Row, Col, Alert} from 'antd';

import {WhispersFeed, MessageBox, Sidemenu, LoginForm} from './components';
import Sider from 'antd/lib/layout/Sider';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

import Whispers from './api/Whispers';

const { Title } = Typography;

let testData = [
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowleasfasdfdge from d100',
    receiver: 'd-104'
  },
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowledasfasge from d100',
    receiver: 'd-104'
  },
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowledge from d100',
    receiver: 'd-104'
  },
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowledge from d100',
    receiver: 'd-104'
  },
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowledge from d100',
    receiver: 'd-104'
  },
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowledge from d100',
    receiver: 'd-104'
  },
  {
    sender: 'd-100',
    isAnon: false,
    content: 'acknowledge from d100',
    receiver: 'd-104'
  },
];
let testCurrentUserId = 'd-104';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {...props, whispers: []};
  }

  onLogin = (values) => {
    this.setState({userId: values.username, isLoggedIn: true});
    Whispers.getReceivedWhispers(this.state.userId, this.getData);
  }

  getData = (res) => {
    this.setState({whispers: res});
    this.forceUpdate();
    console.log(this.state.whispers);
  }

  render() { return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          {this.state.isLoggedIn && <Redirect to="/home" />}
            <LoginForm onFinish={this.onLogin}/>
          </Route>
          <Route path="/home">
          <Row>
            <Col span={4}> 
              <div style={{position: 'fixed'}}>
                <Sidemenu username={this.state.userId}/>
              </div>
            </Col>
            <Col span={10}>
              <div style={{overflow:'scroll', paddingTop: '20px'}}>
                <Title level={3}>Whispers</Title>
                <WhispersFeed style={{overflow:'scroll'}} key={this.state.whispers} whispers={this.state.whispers} currentUserId={this.state.userId}/>
              </div>
            </Col>
            <Col span={10}>
              <div style={{position: 'fixed', paddingTop: '20px', paddingLeft: '20px', marginRight: '20px', width: '100%'}}>
                <MessageBox />
              </div>
            </Col>
          </Row>
          </Route>
        </Switch>
      </Router>


    </div>
  );}
}

export default App;

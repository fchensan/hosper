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

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {...props, whispers: []};
  }

  onLogin = (values) => {
    this.setState({userId: values.username, isLoggedIn: true, whispers: []});
    Whispers.getReceivedWhispers(this.state.userId, this.getData);
    Whispers.getSentWhispers(this.state.userId, this.getData);
  }

  getData = (res) => {
    this.setState((state, props) => {
      whispers: state.whispers.push(...res)
    });
    this.forceUpdate();
    console.log(res);
  }

  onMessageFormFinish = (values) => {
    Whispers.createWhispers(this.state.userId, values.to, values.message, false);
    this.setState({whispers:[]});
    Whispers.getReceivedWhispers(this.state.userId, this.getData);
    Whispers.getSentWhispers(this.state.userId, this.getData); 
  }

  onLogout = () => {
    this.setState({userId: null, isLoggedIn: false, whispers: []})
  }

  render() { return (
    <div key={this.state.isLoggedIn} className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          {this.state.isLoggedIn && <Redirect to="/home" />}
          {!this.state.isLoggedIn && <Redirect to="/" />}
            <LoginForm onFinish={this.onLogin}/>
          </Route>
          <Route path="/home">
          <Row>
            <Col span={4}> 
              <div style={{position: 'fixed'}}>
                <Sidemenu username={this.state.userId} onLogout={this.onLogout}/>
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
                <MessageBox onFormFinish={this.onMessageFormFinish}/>
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

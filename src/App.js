import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';



import {Typography, Row, Col} from 'antd';

import {WhispersFeed, MessageBox, Sidemenu} from './components';
import Sider from 'antd/lib/layout/Sider';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <p>login</p>
          </Route>
          <Route path="/home">
          <Row>
            <Col span={4}> 
              <div style={{position: 'fixed'}}>
                <Sidemenu username="Jack"/>
              </div>
            </Col>
            <Col span={10}>
              <div style={{overflow:'scroll', paddingTop: '20px'}}>
                <Title level={3}>Whispers</Title>
                <WhispersFeed style={{overflow:'scroll'}} whispers={testData} currentUserId={testCurrentUserId}/>
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
  );
}

export default App;

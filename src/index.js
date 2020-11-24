import React from 'react';
import ReactDOM from 'react-dom';
import ViewSelect from './views/viewSelect';
import reportWebVitals from './utils/reportWebVitals';
import {Provider} from "react-redux";
import store from "./features/store";
import {ROOT_ELEMENT_ID} from "./config/constants";
import './index.scss';
import Col from "react-bootstrap/Col";
import Chat from "./components/chat/chat";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container fluid className="full-screen">
        <ViewSelect/>
        <Row className={"footer"}>
          <Col xs={6}>
            <Chat/>
          </Col>
        </Row>
      </Container>
    </Provider>
  </React.StrictMode>,
  document.getElementById(ROOT_ELEMENT_ID)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

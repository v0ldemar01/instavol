import React, {useState} from 'react';
import {useAuth} from '../../hooks/auth';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../actions/authActions';
import LoginForm from '../../components/LoginForm';
import logo from '../../assets/logo.svg';
import instavol from '../../assets/instavol.svg';
import './AuthPage.css';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
const AuthPage = ({user, loading, onLogin}) => {
  const history = useHistory();
  const loginHandler = (form) => {
    return onLogin('/api/signin', 'POST', form);
  }; 
  const postLogin = () => {

  }   
  console.log(user);
  if (user) {
    history.push('/');   
  }
  return (
    <div className="gradient">
      <Container className="text-center Login-container" style={{ height: '100vh' }} >
        <Row className="h-100 justify-content-center align-items-center content">
          <Col md={4}>
            <Card className="Login-card" border="warning">
              <CardBody>
                <div className="text-center mb-3">
                  <img className="App-logo" src={instavol} alt="Instavol" />
                  <span className="text-dark font-italic ">Instagram Client created by v0ldemar_01</span>
                </div>
                <LoginForm loginHandler={loginHandler} loading={loading} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
const mapStateToProps = (state) => {  
  return {
    user: state.userReducer.herrUser,
    loading: state.userReducer.loading,
  }
  
}  

const mapDispatchToProps = (dispatch) => ({
  onLogin: (url, method, body) => dispatch(auth(url, method, body, ''))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
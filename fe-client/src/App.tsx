import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActivateAccountPage from './pages/ActivateAccountPage';
import CameraPage from './pages/CameraPage';
import CamerePage from './pages/CamerePage';
import CreateAccountPage from './pages/CreateAccountPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FormularPage from './pages/FormularPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RezervariPage from './pages/RezervariPage';

export interface AppProps {
  
}
 
export interface AppState {
  
}
 
class App extends React.Component<AppProps, AppState> {
  render() { 
    return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <LoginPage />
          </Route>
          <Route exact path="/forgotPassword">
              <ForgotPasswordPage />
          </Route>
          <Route exact path = "/resetPassword/:token">
              <ResetPasswordPage />
          </Route>
          <Route exact path = "/createAccount">
              <CreateAccountPage />
          </Route>
          <Route exact path = "/activateAccount/:token">
              <ActivateAccountPage />
          </Route>
          <Route exact path = "/main">
              <CamerePage />
          </Route>
          <Route exact path = "/camera">
              <CameraPage />
          </Route>
          <Route exact path = "/formular">
              <FormularPage />
          </Route>
          <Route exact path = "/rezervari">
              <RezervariPage />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
    
  )}
}
 
export default App;
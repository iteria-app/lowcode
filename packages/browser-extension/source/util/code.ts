export const appCode = `import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Menu from "./components/Menu";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
import MainTabs from "./pages/MainTabs";
import { connect } from "./data/connect";
import { AppContextProvider } from "./data/AppContext";
import { loadConfData } from "./data/sessions/sessions.actions";
import { setIsLoggedIn, setUsername, loadUserData, } from "./data/user/user.actions";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Tutorial from "./pages/Tutorial";
import HomeOrTutorial from "./components/HomeOrTutorial";
import { Schedule } from "./models/Schedule";
import RedirectToLogin from "./components/RedirectToLogin";
import Martin from "./pages/Martin";
const App: React.FC = () => {
    return (<AppContextProvider>
      <IonicAppConnected />
      \`\`
    </AppContextProvider>);
};
interface StateProps {
    darkMode: boolean;
    schedule: Schedule;
}
interface DispatchProps {
    loadConfData: typeof loadConfData;
    loadUserData: typeof loadUserData;
    setIsLoggedIn: typeof setIsLoggedIn;
    setUsername: typeof setUsername;
}
interface IonicAppProps extends StateProps, DispatchProps {
}
const IonicApp: React.FC<IonicAppProps> = ({ darkMode, schedule, setIsLoggedIn, setUsername, loadConfData, loadUserData, }) => {
    useEffect(() => {
        loadUserData();
        loadConfData();
        // eslint-disable-next-line
    }, []);
    return schedule.groups.length === 0 ? (<div></div>) : (<IonApp className={\`\${darkMode ? "dark-theme" : ""}\`}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />

          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <MainTabs />}/>
            <Route path="/account" component={Account}/>
            <Route path="/login" component={Login}/><Route path="/Martin" component={Martin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/support" component={Support}/>
            <Route path="/tutorial" component={Tutorial}/>
            <Route path="/logout" render={() => {
        return (<RedirectToLogin setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>);
    }}/>
            <Route path="/" component={HomeOrTutorial} exact/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>);
};
export default App;
const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        darkMode: state.user.darkMode,
        schedule: state.data.schedule,
    }),
    mapDispatchToProps: {
        loadConfData,
        loadUserData,
        setIsLoggedIn,
        setUsername,
    },
    component: IonicApp,
});`

export const loginCode = `import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/schedule', {direction: 'none'});
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})`

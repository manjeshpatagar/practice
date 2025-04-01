import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login'; 
import Register from './components/Employer-pages/Register/Register';
import Task from './pages/Task/task';
import Verify from './pages/Verify/verify';
import AccountCreated from './pages/Account-Created/account';
import Expenses from './pages/Expenses/expenses';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Routes without IonSplitPane */}
          <Route path="/login" exact={true}>
            <Login />
          </Route>

          {/* Routes with IonSplitPane */}
          <Route path="/" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Redirect to="/folder/Inbox" />
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/folder/:name" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Page />
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/map" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Map />
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/register" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Register/>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/task" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Task/>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/verify" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Verify/>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/account-crete" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <AccountCreated/>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/expenses" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Expenses/>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  homeOutline,
  listOutline,
  calendarOutline,
  walletOutline,
  logOutOutline,
  mapOutline,
  closeOutline,
} from 'ionicons/icons';
import './Menu.css';
import { useRef } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeOutline,
  },
  {
    title: 'Tasks',
    url: '/tasks',
    iosIcon: listOutline,
    mdIcon: listOutline,
  },
  {
    title: 'Follow up',
    url: '/follow-up',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline,
  },
  {
    title: 'Map',
    url: '/Map',
    iosIcon: mapOutline,
    mdIcon: mapOutline,
  },
  {
    title: 'Expense',
    url: '/expense',
    iosIcon: walletOutline,
    mdIcon: walletOutline,
  },
  {
    title: 'Add Leave',
    url: '/add-leave',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline,
  },
  {
    title: 'Logout',
    url: '/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const menuRef = useRef<HTMLIonMenuElement>(null);

  // Function to close the menu
  const closeMenu = () => {
    menuRef.current?.close();
  };

  return (
    <IonMenu contentId="main" type="overlay" ref={menuRef}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader className="menu-header">
            <div className="header-title">Loctrack</div>
            <IonButton fill="clear" onClick={closeMenu}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonListHeader>

          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
                onClick={closeMenu}
              >
                <IonIcon
                  aria-hidden="true"
                  slot="start"
                  ios={appPage.iosIcon}
                  md={appPage.mdIcon}
                />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

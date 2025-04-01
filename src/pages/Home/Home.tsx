import React from "react";
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>You are now logged in!</h2>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React from "react";
import { IonContent, IonInput, IonButton, IonPage, IonText } from "@ionic/react";
import "./Login.css";
import logo from "./images/locktrack.png";

const Login: React.FC = () => {
    return (
        <IonPage className="ion-page">
            <div className="login-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <div className="header">
                    <h1>Login</h1>
                    <h2>To Loctrack</h2>
                </div>

                <p className="subtitle">Login with username or email and password to use your account</p>

                <div className="form-container">
                    <div className="input-container">
                        <IonInput className="input-field" placeholder="Email" type="email"></IonInput>
                    </div>

                    <div className="input-container">
                        <IonInput className="input-field" placeholder="Password" type="password"></IonInput>
                    </div>

                    <IonText className="restore-text">Restore password?</IonText>

                    <IonButton expand="block" className="login-button">
                        Login
                    </IonButton>
                    <IonButton expand="block" fill="outline" className="otp-button">
                       Login  with OTP
                    </IonButton>

                    <p className="register-text">
                        Don’t have account? <a href="/SignUp">Sign Up</a>
                    </p>
                </div>
            </div>
        </IonPage>
    );
};

export default Login;
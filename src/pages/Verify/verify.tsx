import React, { useState, useEffect, useRef } from "react";
import {
    IonPage,
    IonContent,
    IonText,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol
} from "@ionic/react";
import "./verify.css";

const Verify: React.FC = () => {
    const [digits, setDigits] = useState(["", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(60);
    const inputsRef = useRef<(HTMLIonInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleDigitChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Allow only a single digit
        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        // Move focus to next input if a digit is entered
        if (value && index < 3) {
            inputsRef.current[index + 1]?.setFocus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.setFocus();
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding ion-text-center">
                <div className="verify-container">
                    <IonText className="verify-heading">
                        <div>Verify</div>
                        <div>Account!</div>
                    </IonText>

                    <IonText color="medium">
                        <p style={{ textAlign: "left", lineHeight: "20px,", color: "#9A9AAA" }}>
                            Enter the 4-digit code sent to
                            <br />
                            <strong style={{ color: "#6759D0" }}>+0 000 000 0000</strong>
                        </p>
                    </IonText>

                    <div className="code-inputs">
                        <IonRow>
                            {digits.map((_, index) => (
                                <IonCol key={index} size="3">
                                    <IonInput
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        value={digits[index]}
                                        type="tel"
                                        onIonInput={(e) => handleDigitChange(e.detail.value!, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="code-input"
                                        inputMode="numeric"
                                    />
                                </IonCol>
                            ))}
                        </IonRow>
                    </div>
                    <div style={{ paddingTop: "60px",lineHeight:"22px" }}>

                        <div> <IonText color="medium">
                            <div style={{ textAlign: "left", color:"#9A9AAA" }}>This season will end  {timeLeft} seconds.</div>
                        </IonText>
                        </div>
                        <div className="resend-container">
                            <p className="resend-text">
                                Didn't get a code?{" "}
                                <span className={`resend-link ${timeLeft > 0 ? "disabled" : ""}`}>
                                    Resend Code
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="continue-button">
                        <button className="custom-continue-button" disabled={digits.includes("")}>
                            Continue
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Verify;

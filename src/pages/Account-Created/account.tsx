import React from "react";
import "./account.css";

const AccountCreated: React.FC = () => {
    return (
        <div className="account-container">
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "300vh", 
                textAlign: "center", 
            }}>
                <div className="account-icon-container">
                    <div className="account-check-icon">✔</div>
                </div>

                <h2 className="account-title">Account Created</h2>
                <p className="account-description">
                    Dear user, your account has been created successfully. Sign in to start using the app.
                </p>
            </div>
            <div className="account-container">
                <button className="account-continue-button">Continue</button>
            </div>
        </div>
    );
};

export default AccountCreated;

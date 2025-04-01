import React, { useState } from "react";
import { IonButton, IonInput, IonList } from "@ionic/react";
import "./Register.css";
import logo from "./images/locktrack.png";

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        firmName: "",
        firmOwner: "",
        gstNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        licenseNumber: "",
    });

    const [errors, setErrors] = useState({
        firmName: "",
        firmOwner: "",
        gstNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        licenseNumber: "",
    });

    // Function to validate GST Number (simple pattern example)
    const isValidGST = (gst: string) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(gst);

    // Handle input change
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });

        // Clear error on input change
        setErrors({ ...errors, [field]: "" });
    };

    // Form validation
    const validateForm = () => {
        let newErrors = { ...errors };
        let valid = true;

        if (!formData.firmName) {
            newErrors.firmName = "*Firm Name is required";
            valid = false;
        }
        if (!formData.firmOwner) {
            newErrors.firmOwner = "*Firm Owner Name is required";
            valid = false;
        }
        if (!formData.gstNumber) {
            newErrors.gstNumber = "*GST Number is required";
            valid = false;
        } else if (!isValidGST(formData.gstNumber)) {
            newErrors.gstNumber = "*Invalid GST Number";
            valid = false;
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "*Phone Number is required";
            valid = false;
        }
        if (!formData.email) {
            newErrors.email = "*Email ID is required";
            valid = false;
        }
        if (!formData.password) {
            newErrors.password = "*Password is required";
            valid = false;
        }
        if (!formData.licenseNumber) {
            newErrors.licenseNumber = "*License Number is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form Submitted Successfully!", formData);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-logo-container">
                    <img src={logo} alt="Logo" className="register-logo" />
                </div>

                <div className="register-header">
                    <h1>Register</h1>
                    <h2>To Loctrack</h2>
                </div>

                <p className="register-subtitle">
                    Register with username or email and password to use your account
                </p>

                <IonList className="register-form">
                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="Firm Name"
                            value={formData.firmName}
                            onIonChange={(e) => handleChange("firmName", e.detail.value!)}
                        />
                        {errors.firmName && <p className="error-text">{errors.firmName}</p>}
                    </div>

                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="Firm Owner Name"
                            value={formData.firmOwner}
                            onIonChange={(e) => handleChange("firmOwner", e.detail.value!)}
                        />
                        {errors.firmOwner && <p className="error-text">{errors.firmOwner}</p>}
                    </div>

                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="GST Number"
                            value={formData.gstNumber}
                            onIonChange={(e) => handleChange("gstNumber", e.detail.value!)}
                        />
                        {errors.gstNumber && <p className="error-text">{errors.gstNumber}</p>}
                    </div>

                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="Phone Number"
                            type="tel"
                            value={formData.phoneNumber}
                            onIonChange={(e) => handleChange("phoneNumber", e.detail.value!)}
                        />
                        {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                    </div>

                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="Email id"
                            type="email"
                            value={formData.email}
                            onIonChange={(e) => handleChange("email", e.detail.value!)}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="Password"
                            type="password"
                            value={formData.password}
                            onIonChange={(e) => handleChange("password", e.detail.value!)}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="register-input-container">
                        <IonInput
                            className="input-field"
                            placeholder="License Number"
                            value={formData.licenseNumber}
                            onIonChange={(e) => handleChange("licenseNumber", e.detail.value!)}
                        />
                        {errors.licenseNumber && <p className="error-text">{errors.licenseNumber}</p>}
                    </div>
                </IonList>

                <IonButton expand="block" className="login-button" onClick={handleSubmit}>
                    Register
                </IonButton>

                <p className="login-text">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;

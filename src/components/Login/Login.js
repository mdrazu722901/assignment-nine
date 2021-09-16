import './Login.css'
import React, { useContext, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
const app = initializeApp(firebaseConfig);
const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [checkbox, setCheckbox] = useState(false);
    
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleLoginSite = (e) => {
        history.push(`/conform/bus`);
    }
    const [data, setData] = useContext(UserContext);
    console.log(data.displayName);

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const information = result.user;
                console.log(information)
                setData(information)
                history.replace(from);
                handleLoginSite(information.displayName);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    const handleBlur = (e) => {
        let valueValid = true;
        if (e.target.name === "Email") {
            valueValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "Password") {
            const passwordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            valueValid = passwordValid && passwordNumber;
        }
        // ==================not understand yet===========================
        if (valueValid || e.target.name === "name") {
            const userValue = { ...user };
            userValue[e.target.name] = e.target.value;
            setUser(userValue);
        }
    }
    const handleSubmit = (e) => {
        console.log("input button click")
        if (checkbox && user.email && user.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    const information = userCredential.user;
                    console.log(information);
                    upDateUserName(user.name);
                    setData(information);
                    history.replace(from);
                    handleLoginSite(information.displayName);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        };
        if (!checkbox && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const information = userCredential.user;
                    console.log(information);
                    setData(information);
                    history.replace(from);
                    handleLoginSite(information.displayName);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        };
        e.preventDefault();
    };
    const upDateUserName = name => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name
        }).then((res) => {
            console.log("update user name")
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="mainBox">
            <button onClick={handleGoogleSignIn}>google sign In</button>
            <form onClick={handleSubmit}>
                <br />
                {
                    checkbox && <input type="text" onBlur={handleBlur} name="name" id="" />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} required placeholder="Your email" id="" />
                <br />
                <input type="password" name="password" onBlur={handleBlur} required placeholder="Password" id="" />
                <br />
                <input type="button" value="submit" />
                <br />
                <br />
                <label>Already have an accout?</label> <a href="" onClick={() => setCheckbox(!checkbox)}>Login</a>
            </form>
        </div>
    );
};

export default Login;
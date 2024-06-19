import React, { useEffect, useState } from 'react';
import Home from './Home';
import { auth, db } from '../firebase';
import { doc, collection, getDocs } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth';
import Loginform from '../components/Loginform';
import Alert from '../components/Alert';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [alert,setAlert] = useState("")
    
    //Controll User Signin
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        setUser(user);
                        fetchUserHistory(user.uid);
                    }
                });
            })
            .catch((error) => {
                setAlert("error")
            });
    }, []);

    //Sign in 
    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            fetchUserHistory(user.uid);
            console.log("User signed in:", user.uid);
        } catch (err) {
            setAlert("error")
        }
    };

    //Log in
    const logIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            fetchUserHistory(user.uid);
            console.log("User logged in:", user.uid);
        } catch (err) {
            setAlert("error")
        }
    };

    const fetchHistoryEntries = async (userId) => {
        const userRef = doc(db, "users", userId);
        const historyRef = collection(userRef, "history");
        const querySnapshot = await getDocs(historyRef);
        const historyEntries = [];
        querySnapshot.forEach((doc) => {
            historyEntries.push({ id: doc.id, ...doc.data() });
        });
        return historyEntries;
    };
    

    //Set Data to State
    const fetchUserHistory = async (userId) => {
        try {
            const historyEntries = await fetchHistoryEntries(userId);
            setHistory(historyEntries);
        } catch (err) {
            setAlert("error")
        }
    };

    //Clear User Data When Sign Out
    const handleSignOut = () => {
        setUser(null);
        setHistory([]);
    };

    return (
        <div>
            { user == null ? ( 
                <> 
                    {alert == "error" ? 
                        (<Alert setAlert ={setAlert}/>) : (null)
                    }
                    <Loginform setEmail = {setEmail} setPassword={setPassword} signUp={signUp} logIn={logIn}/>
                </>
            ) : (
                <Home user={user} history={history} fetchUserHistory={fetchUserHistory} onSignOut={handleSignOut} setAlert={setAlert} />
            )}
        </div>
    );
}


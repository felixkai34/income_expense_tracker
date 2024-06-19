import React, { useState } from 'react';
import { doc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import AddForm from '../components/AddForm';
import LogOutAlert from '../components/LogOutAlert';

export default function Home({ user, history, fetchUserHistory ,onSignOut,setAlert }) {
    const [type, setType] = useState("income");
    const [value, setValue] = useState(0);
    const [detail, setDetail] = useState("");
    const [addFromVisiblity,setaddFromVisiblity] = useState("hide")
    const [showLogoutAlert,setshowLogoutAlert] = useState("hide")

    //Log Out
    const logOut = async () => {
        try {
            await signOut(auth);
            onSignOut();
        } catch (err) {
            setAlert("error")
        }
    };

    //Adding User Data
    const addHistoryEntry = async (userId, type, value, detail) => {
        const userRef = doc(db, "users", userId);
        const historyRef = collection(userRef, "history");
        await addDoc(historyRef, {
            type: type,
            value: value,
            detail: detail,
        });
    };

    //Handle User Data
    const handleAddEntry = async () => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            try {
                await addHistoryEntry(userId, type, value, detail);
                await fetchUserHistory(userId);
                setaddFromVisiblity("hide");
            } catch (err) {
                setAlert("error")
            }
        }
    };

    // Delete User Data
    const deleteHistoryEntry = async (userId, entryId) => {
        const entryRef = doc(db, `users/${userId}/history/${entryId}`);
        try {
            await deleteDoc(entryRef);
            await fetchUserHistory(userId);
        } catch (err) {
            setAlert("error");
        }
    };

    const totalIncome = history
        .filter( h => h.type == "income")
        .map( h => parseFloat (h.value))
        .reduce((sum, value) => sum + value, 0);


    const totalExpense = history
        .filter( h => h.type == "expense")
        .map( h => parseFloat (h.value))
        .reduce((sum, value) => sum + value, 0);


    //Home Page UI
    return (
        <>
            <div className=' w-full md:w-2/3 lg:w-1/2 h-screen mx-auto p-10'>

                {/* Header */}
                <header className=' text-center text-3xl font-semibold text-green-400 mb-20'> 
                    Expense Income Tracker 
                </header>

                {/* Balance */}
                <div className='flex justify-between mb-10'>
                    <p className='flex text-2xl'> 
                        Balance :<strong className=' font-bold ml-2'>{totalIncome - totalExpense}</strong> 
                    </p>

                    <button 
                    onClick={()=>{ setaddFromVisiblity("show") }}
                    className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'> 
                        Add 
                    </button>
                </div>

                {/* Expense Income */}

                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10'>

                    <div className=' border border-black rounded-lg px-5 py-2'>
                        <p className='text-xl'> 
                            Income <strong className='block text-2xl text-green-500 font-bold'>{totalIncome}</strong> 
                        </p>
                    </div>

                    <div className=' border border-black rounded-lg px-5 py-2'>
                        <p className='text-xl'> 
                            Expense <strong className='block text-2xl text-red-500 font-bold'>{totalExpense}</strong> 
                        </p>
                    </div>
                </div>

                <h1 className='font-bold text-3xl mb-10'> Transactions </h1>
                
                {/* Transactions */}

                <div>

                    {history.map((h, index) => {
                        return(
                            <div
                                key={index}
                                className='relative overflow-hidden grid grid-cols-3 border border-gray-400 rounded-md px-5 py-2 mb-5'
                            >
                                <p>{h.detail}</p>
                                <p className=' text-center'>{(h.type == "income" ? "+" : "-") + h.value}</p>
                                <div className='text-xl cursor-pointer flex justify-end'>
                                    <i 
                                    onClick={() => deleteHistoryEntry(user.uid, h.id)}
                                    className="fa-solid fa-trash mr-3"></i>
                                </div>
                                <div className={'absolute w-1 h-full top-0 right-0 ' + (h.type == "income" ? 'bg-green-400' : 'bg-red-400')}></div>
                            </div>
                        )
                    })}
                        
                </div>
                
                <div className=' flex justify-end mt-10'>
                    <button 
                        onClick={()=>{ setshowLogoutAlert("show") }}
                        className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mb-10'> 
                        Logout 
                    </button>
                </div>

                {addFromVisiblity === "show" ? (
                    <AddForm 
                        setaddFromVisiblity={setaddFromVisiblity} 
                        type={type}
                        value={value}
                        detail={detail}
                        setType={setType}
                        setValue={setValue}
                        setDetail={setDetail}
                        handleAddEntry={handleAddEntry}
                    />
                ) : null}

                {showLogoutAlert === "show" ? (
                    <LogOutAlert 
                        setshowLogoutAlert={setshowLogoutAlert} 
                        logOut={logOut} 
                    />
                ) : null}

            </div>
        </>
    );
}
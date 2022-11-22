import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import s from './Containers/Containers.module.css'
import {Navbar} from "./Navbar/Navbar";
import {Display} from "./Display/Display";
import {getAuthUserData} from "./store/auth-reducer";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {useSelector} from "react-redux";
import {Login} from "./Login/Login";


function App() {

    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [])

    return (
        <div className={s.mainContainer}>
            <div>
                <Header/>
                {!isAuth ? <Login/> :
                    <div className={s.dispNavContainer}>
                    <Navbar/>
                    <Display/>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;



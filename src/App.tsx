import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import s from './Containers/Containers.module.css'
import {Navbar} from "./Navbar/Navbar";
import {Display} from "./Display/Display";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {useSelector} from "react-redux";
import {Login} from "./Login/Login";
import {initializeApp} from "./store/app-reducer";
import {Preloader} from "./common/Preloader/Preloader";


function App() {

    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)
    const initialized = useSelector<AppRootStateType, boolean>(st => st.app.initialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }
    console.log(isAuth , ' AUTH')
    return (
        <div className={s.mainContainer}>
            <div>
                <Header/>
                {!isAuth  ? <Login/> :
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



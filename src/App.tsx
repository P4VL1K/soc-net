import React from 'react';
import './App.css';
import {Header} from "./Header/Header";
import s from './Containers/Containers.module.css'
import {Navbar} from "./Navbar/Navbar";
import {Display} from "./Display/Display";

function App() {
    return (
        <div className={s.mainContainer}>
            <div>
                <Header/>
                <div className={s.dispNavContainer}>
                    <Navbar/>
                    <Display/>
                </div>
            </div>
        </div>
    );
}

export default App;



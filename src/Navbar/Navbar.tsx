import React, {useState} from 'react'
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import {ButtonGroup} from "@mui/material";

export const Navbar = () => {

    const [active, setActive] = useState('')

    return <div className={s.navbarContainer}>
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
        >
            <div className={s.navLink}>
                <NavLink to={'/profile'}>
                    <Button
                        sx={{ width: 200, padding: 1}}
                        size="large"
                        onClick={() => setActive('profile')}
                        variant={active === 'profile' ? 'contained' : 'text'}
                        startIcon={<PersonIcon/>}>
                        Profile
                    </Button>
                </NavLink>
            </div>
            <div className={s.navLink}>
                <NavLink to={'/users'}>
                    <Button
                        sx={{ width: 200, padding: 1}}
                        size="large"
                        onClick={() => setActive('users')}
                        variant={active === 'users' ? 'contained' : 'text'}
                        startIcon={<GroupIcon/>}>
                        Users
                    </Button>
                </NavLink>
            </div>
            <div className={s.navLink}>
                <NavLink to={'/dialogs'}>
                    <Button
                        sx={{ width: 200, padding: 1}}
                        size="large"
                        onClick={() => setActive('dialogs')}
                        variant={active === 'dialogs' ? 'contained' : 'text'}
                        startIcon={<EmailIcon/>}>
                        Dialogs
                    </Button>
                </NavLink>
            </div>
        </ButtonGroup>
    </div>
}
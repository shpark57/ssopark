
import React, {useContext} from "react";
import './topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'
import {Link } from 'react-router-dom'


import { LoginContext  } from 'src/contexts/login';

export default function Topbar(){
    
    const {loggedIn , user , setLoggedOut} = useContext(LoginContext);


    const handleLogout  = (e:React.MouseEvent<HTMLImageElement>) => { //임시로 로그아웃버튼을 탑바의 사진모양 클릭으로 만들어둠.
        setLoggedOut() //로그아웃 처리
    }

    
    return(
        <div className='topbar'>
            <div className='topbarWrapper'>
                <div className='topLeft'>
                    <Link to={"/"}>
                        <span className='logo'>SsoPark</span>
                    </Link>
                </div>
                <div className='topRight'>
                    <div className='topbarIconContainer'>
                        <NotificationsNoneIcon/>
                        <span className='topiconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <LanguageIcon/>
                        <span className='topiconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <SettingsIcon/>
                        <span className='topiconBadge'>2</span>
                    </div>
                    <img
                        src={user.avatar ? user.avatar : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png"}
                        alt=""
                        className="topAvatar"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    )
}
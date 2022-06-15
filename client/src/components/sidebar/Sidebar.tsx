import React, {useState, useEffect } from "react";
import './sidebar.css'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';




export default function Sidebar(){
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const menuClick = (e:React.MouseEvent<HTMLLIElement>) => {  //li클릭 이벤트
        if(!(e.target instanceof HTMLLIElement)){ 
            return;
        }
        const url = e.target.dataset.url                //menu 데이터에 url을 data-url 에 삽입
        if(url == '#submenu'){  //서브메뉴는 url이 #submenu
            let subMenuDiv = e.target.nextElementSibling as HTMLUListElement    
            let childNodes = subMenuDiv.childNodes 
            for(let i =0; i < childNodes.length ; i++){
                let childNode = childNodes[i] as HTMLLIElement
                if(childNode.style.display == 'block'){
                    childNode.style.display = 'none'
                }else{
                    childNode.style.display = 'block'
                }
            }
        }else{
            navigate(String(url))
        }

    }
    const [menuData , setMenuData] = useState([{"menu":"","title":"","menuList":[ { "menu":"" ,"title":"","url" : "" , "icon" : "" , "subMenu": [{ "menu":"" ,"title":"","url" : "" , "icon" : ""}] }]}])
    useEffect(() => {
        axios.get('http://localhost:4000/menu')
            .then(res => setMenuData(res.data))
    },[])  
    
    
    return (
        <div className="sidebar">
            <div className='sidebarWrapper'>
                {menuData.map((menuList) =>{
                    return (
                        <div className='sidebarMenu' key={menuList.menu}>
                            <h3 className='sidebarTitle'>{menuList.title}</h3>
                            <ul className='sidebarList'>
                                {menuList.menuList.map((menu) =>{
                                    return(
                                            <div key={menu.menu}>
                                                <li className='sidebarListItem' onClick={menuClick} data-url={menu.url}>
                                                    <HomeWorkIcon/>
                                                    {menu.title}
                                                </li>
                                                    <ul className="subMenu">
                                                        {menu.subMenu.map((subMenu) =>{
                                                            return(
                                                                <li className='sidebarSubMenu' key={subMenu.menu} onClick={menuClick} data-url={subMenu.url}>
                                                                    <AccountBoxIcon/>
                                                                    {subMenu.title}
                                                                </li>
                                                                )
                                                            })}
                                                    </ul>
                                            </div>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
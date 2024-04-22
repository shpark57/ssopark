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
        if(typeof url === 'undefined'){  //서브메뉴는 url이 #submenu
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

    interface menuInfo {
        id:number,
        parent_id:number,
        name:string,
        list_order:number,
        url:string,
        icon:string,
        clildren:any
    }
    interface childrenInfo {
        id:number,
        parent_id:number,
        name:string,
        list_order:number,
        url:string,
        icon:string
    }
    const [menuData , setMenuData] = useState([ {id:0 , parent_id:0 , name:'' ,list_order:0,url:'',icon:'',children:[{id:0 , parent_id:0 , name:'' ,list_order:0,url:'',icon:''}]} ])
    useEffect( () => {
        async function getMenuAndSet(){
            const res = await  axios.get( '/api/Menu?_rel=children&parent_id=null&_sort=list_order')
            setMenuData(res.data)
        }
        getMenuAndSet()
    },[])  
    
    return (
        <div className="sidebar">
            <div className='sidebarWrapper'>
            {
                    menuData.map((menu) => {
                        return(
                            <div className='sidebarMenu' key={menu.id}>
                                <h3 className='sidebarTitle'>{menu.name}</h3>
                                <ul className='sidebarList'>
                                <div key={menu.id}>
                                    <li className='sidebarListItem' onClick={menuClick} data-url={menu.url}>
                                        <HomeWorkIcon/>
                                        {menu.name}
                                    </li>
                                    <ul className="subMenu">
                                        { 
                                            menu.children.map((child) => {
                                                return(
                                                    <li className='sidebarSubMenu' key={child.id} onClick={menuClick} data-url={child.url}>
                                                        <AccountBoxIcon/>
                                                        {child.name}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                </ul>
                            </div>
                        )
                    })
            }
            </div>
        </div>
    )
}
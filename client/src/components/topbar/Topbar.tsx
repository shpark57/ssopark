import MenuIcon from '@mui/icons-material/Menu';
import React, {useContext, useState} from "react";
import './topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'
import {Link, useNavigate} from 'react-router-dom'

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {Box, Container, InputBase, Paper} from "@mui/material";


import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


import { LoginContext  } from 'src/contexts/login';
import {Login} from "@mui/icons-material";
import useModal from "../modal/hooks/useModal";

import LoginPage from "src/pages/user/login/defaultLogin/Login";
import UserModify from "../../pages/user/modify/UserModify";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import NonMembers from "src/pages/order/view/pop/NonMembers";
import {OrdersProps} from "../../pages/order/props/OrdersProps";
import {BordersProps} from "@mui/system";

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions'


export default function Topbar(){

    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const {loggedIn,  user , setLoggedOut} = useContext(LoginContext);

    const { showModal } = useModal();           //모달 사용

    const handleLogout  = (e:React.MouseEvent<HTMLImageElement | HTMLLIElement>) => { //임시로 로그아웃버튼을 탑바의 사진모양 클릭으로 만들어둠.
        showModal({
            modalType: "AlertModal",
            modalProps: {
                message:  "로그아웃 됐습니다.",
                handleConfirm : arg => {setLoggedOut()}
            }
        });
        navigate(String("/"))
    }

    const handleLogIn  = (e:React.MouseEvent<HTMLImageElement | HTMLLIElement>) => { //임시로 로그인버튼을 탑바의 사진모양 클릭으로 만들어둠.
        showModal({
            modalType: "IncludeModal",
            modalProps: {
                message:  <LoginPage/>
            }
        });
       // navigate(String("/login"))
    }

    //좌측의 메뉴
    const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
    const open1 = Boolean(anchorEl1);
    const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };


    //우측의 사용자
    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };


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
    const handleModify = () => {
        showModal({
            modalType: "IncludeModal",
            modalProps: {
                message: <UserModify id={user.id}/>
            }
        });
    }

    const goCarts =() =>{

        navigate(String("/carts"))
    }

    function orderChild(order: OrdersProps) {
        navigate("/orderView" , {state : {
                order :  order
            }})
    }

    const goOrderList =() =>{
        if(loggedIn){
            navigate(String("/orderList"))
        }else{


            showModal({
                modalType: "IncludeModal",
                modalProps: {
                    message:  <NonMembers setParentOrder ={orderChild}/>
                }
            });
        }
    }

/*
    const [searchProdcut , setSearchProdcut]  = useState("");
    const [fixSearchProdcut , setFixSearchProdcut]  = useState("");

    const handleChangeProduct = (event: React.ChangeEvent) =>{
        // @ts-ignore
        let value = event.target.value
        setSearchProdcut(value)

    }
    const iconClick  = () =>{
        setFixSearchProdcut(searchProdcut)
    }
*/
    return(
        <div className='topbar'>
            <div className='topbarWrapper'>
                <div className='topLeft'>


                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick1}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open1 ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open1 ? "true" : undefined}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl1}
                        id="account-menu"
                        open={open1}
                        onClose={handleClose1}
                        onClick={handleClose1}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem onClick={menuClick} data-url="/">
                            메인
                        </MenuItem>
                        <MenuItem onClick={menuClick} data-url="/productsList">
                            제품 리스트
                        </MenuItem>
                        {   user.auth == 'admin' &&
                            <MenuItem onClick={menuClick} data-url="/users">
                                유저
                            </MenuItem>
                        }
                        {   user.auth == 'admin' &&
                            <MenuItem onClick={menuClick} data-url="/orderListAdmin">
                                주문 목록
                            </MenuItem>

                        }

                    </Menu>
                </div>
                {/*
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' , width:150 ,boxShadow  : '0px 1px 0px 0px rgba(0, 0, 0, 0.12)'}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="제품 검색"
                        inputProps={{ 'aria-label': '제품 검색' }}
                        value={searchProdcut}
                        onChange={handleChangeProduct}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={iconClick}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                */}
                <div className='topRight'>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick2}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open2 ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open2 ? "true" : undefined}
                        >
                            <Avatar />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl2}
                        id="account-menu"
                        open={open2}
                        onClose={handleClose2}
                        onClick={handleClose2}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >

                        {
                            loggedIn  &&
                                <MenuItem onClick={handleModify}>
                                    <Avatar /> 내정보
                                </MenuItem>

                        }
                        {
                            loggedIn  &&
                                <Divider />

                        }

                        <MenuItem onClick={goCarts}>
                            <ListItemIcon >
                                <ShoppingCartIcon fontSize="small" />
                            </ListItemIcon >
                            장바구니
                        </MenuItem>
                        <MenuItem onClick={goOrderList}>
                            <ListItemIcon >
                                <LibraryBooksIcon fontSize="small" />
                            </ListItemIcon >
                            주문내역
                        </MenuItem>
                        {
                            loggedIn  ?
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon >
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                                :
                                <MenuItem onClick={handleLogIn}>
                                    <ListItemIcon>
                                        <LoginIcon fontSize="small" />
                                    </ListItemIcon>
                                    LogIn
                                </MenuItem>
                        }
                    </Menu>
                </div>
            </div>
        </div>
    )
}
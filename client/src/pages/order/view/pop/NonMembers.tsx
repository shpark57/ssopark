import React , {useState,useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import axios from 'axios';
import useModal from "src/components/modal/hooks/useModal";
import {useNavigate} from "react-router-dom";
import {OrdersProps} from "../../props/OrdersProps";



type NonMemberProp = {
    setParentOrder : any;
};
const NonMembers:React.FC<NonMemberProp> = (props) => {
    const { showModal,hideModal } = useModal();
    const [id , setId] = useState("")

    const handleChangeId = (event: React.ChangeEvent) =>{
        // @ts-ignore
        let value = event.target.value
        setId(value)

    }




    function setParentOrder(order : OrdersProps){
        props.setParentOrder(order)
    }

    const handleClickYes =() => {

        if(id == ''){
            alert("송장번호를 입력해주세요")
            return;
        }

        axios.get(process.env.REACT_APP_SERVER_HOST_API + '/Orders?id='+id+'&_rel=details')
            .then(res=>{
                if (res.data.length > 0){
                    setParentOrder(res.data[0])
                    hideModal()
                }else{
                    alert("주문번호가 일치하지 않습니다.")
                    return;
                }
            })
    }


    const handleClickNo =() => {
        hideModal()
    }

    return (
        <Container component="main" maxWidth="xs">
            <Grid  container spacing={2} >
                <Grid item xs={12}>
                    주문번호를 입력해주세요.
                </Grid>
                <Grid item xs={12}  sm={12}>
                    <TextField
                        required
                        fullWidth
                        id="id"
                        label="주문번호"
                        name="id"
                        value ={id}
                        onChange={handleChangeId}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button sx ={{float : 'right'}} onClick={handleClickYes}>YES</Button>
                    <Button sx ={{float : 'right'}} onClick={handleClickNo}>NO</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NonMembers;
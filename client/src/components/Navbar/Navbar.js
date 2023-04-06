import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { todoactions,actions } from '../../store';
import {useState} from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addTask, fetchData } from '../../functions';




const Navbar = () => {
    const {token}=useSelector((state)=>state.userReducer);
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
    const [text, setText] = useState('');

    const [open, setOpen] = useState(false);

    const [flag, setflag] = useState(false);

    useEffect(() => {
      if (flag === true) {
        document.getElementsByClassName("navbar_responsive")[0].style.display =
          "flex";
      }
      if (flag === false) {
        document.getElementsByClassName("navbar_responsive")[0].style.display =
          "none";
      }
    }, [flag]);
  

    const logoutHandler=()=>{
      dispatch(actions.logout());
      dispatch(todoactions.clearData())
      navigate('/Login');
    }

    const cancelHandler = (e) => {
        setOpen(false);
        setText('');
    };

    const handleOpen=()=>{
      setOpen(true);
    }
    
    const handleClose=async()=>{
      try{
        dispatch(actions.loadingStart());
        await addTask(token,text)

        const res=await fetchData(token);
        dispatch(todoactions.setData(res.data.data));
        dispatch(actions.loadingSuccess());

      }catch(err){
        console.log(err);
        dispatch(actions.loadingFail())
      };
      setText('');
      setOpen(false);
    }


  return (
    <>
      <div className='navbar'>
          <h2>TaskManger</h2>
          <div className='navbar_links'>
              <Link to='/home'>Home</Link>
              <Link to='/Login'>Login</Link>
              <button className='navbar_links_logout' onClick={logoutHandler}>Logout</button>
              <button className="navbar_links_addtask" onClick={handleOpen}>Add Task</button>
          </div>
          <div className='navbar_responsive_menu'>
            <button onClick={()=>{setflag(!flag)}} className='navbar_responsive_button'><i class="fa-solid fa-bars"></i></button>
            <button onClick={handleOpen} className="navbar_responsive_add"><i class="fa-solid fa-plus"></i></button>
          </div>
      </div>
      <div className='navbar_responsive'>
              <Link to='/home'>Home</Link>
              <Link to='/Login'>Login</Link>
              <button onClick={logoutHandler}>Logout</button>
      </div>
      <Dialog open={open}>
            <DialogTitle>Todo's</DialogTitle>
            <DialogContent>
                <DialogContentText>Add your task</DialogContentText>
                <TextField required={true} autoFocus margin="dense" id="name" label="Enter task" fullWidth variant="standard"
                    value={text}
                    onChange={(e)=>{setText(e.target.value)}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelHandler}>Cancel</Button>
                <Button onClick={handleClose}>Add</Button>
            </DialogActions>
      </Dialog>
    </>
  )
}

export default Navbar
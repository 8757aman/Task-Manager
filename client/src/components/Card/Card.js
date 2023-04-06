import React from 'react'
import './Card.css'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { todoactions,actions } from '../../store';
import {useNavigate} from 'react-router-dom'
import { deleteTask, fetchData } from '../../functions';


const Card = ({e}) => {

  const {token}=useSelector((state)=>state.userReducer);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const d = new Date(e.time);
  let day = weekday[d.getDay()];
  let hours=d.getHours();
  let minutes=d.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime =day+' '+ hours + ':' + minutes + ' ' + ampm;

  const deleteHandler=async()=>{
    try{
      dispatch(actions.loadingStart());
      await deleteTask(e._id,token);      
      dispatch(actions.loadingSuccess());
      
      const res=await fetchData(token);

      dispatch(todoactions.setData(res.data.data));
      dispatch(actions.loadingSuccess());
    }
    catch(err){
      alert(err);
      dispatch(actions.loginFail());
    }
  }

  return (
    <div className='card'>
        <div className='card_title'>
          <h3 className='card_heading'>{e.task.slice(0,25)}</h3>
        </div>
        <div className='card_date'>
            <p>{strTime}
            </p>
        </div>
        <div className='card_button'>
            <button onClick={()=>{navigate(`/${e._id}`)}}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    </div>
  )
}

export default Card
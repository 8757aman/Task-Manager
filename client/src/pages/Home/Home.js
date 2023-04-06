import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import './Home.css'
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store';
import { todoactions } from '../../store';
import { fetchData } from '../../functions';

const Home = () => {
    const {token,isFetching,error} = useSelector((state) => state.userReducer);
    const {data}=useSelector((state)=>state.todoReducer);
    const dispatch=useDispatch();
    
    useEffect(() => {
        dispatch(actions.loadingStart());
        fetchData(token).then((res) => {
              dispatch(todoactions.setData(res.data.data));
              dispatch(actions.loadingSuccess());
        }).catch((err) => {
            console.log(err);
            dispatch(actions.loadingFail());
        })
    },[])

    if (token === 'null') {
        return (
            <div>
                <p>please login first</p>
                <Link to='/Login'>Login</Link>
            </div>
        )
    }

    if(isFetching){
      return(
        <div className='loading'></div>
      )
    }

    if(error){
      return(
        <div>error please login</div>
      )
    }

    return (
        <div className='home'>
            <Navbar/>
            <div className='home_card'>
                {data.length===0?<p>no task found</p>:
                data.map((e) => (
                    <Card key={e._id} e={e}/>))
            } </div>
        </div>
    )
}

export default Home

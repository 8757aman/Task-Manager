import {configureStore,createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        token:localStorage.getItem("token")||null,
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart(state,action){
            state.isFetching=true;
        },
        loginFail(state,action){
            state.isFetching=false;
            state.error=true;
        },
        loginSuccess(state,action){
            state.token=action.payload;
            localStorage.setItem("token",action.payload);
            state.isFetching=false;
            state.error=false;
        },
        logout(state,action){
            state.token=null;
            localStorage.setItem("token",null);
        },
        loadingStart(state,action){
            state.isFetching=true;
        },
        loadingSuccess(state,action){
            state.isFetching=false;
            state.error=false;
        },
        loadingFail(state,action){
            state.error=true;
            state.isFetching=false;
        }
    }
})

const todoSlice=createSlice({
    name:"todo",
    initialState:{
        data:JSON.parse(localStorage.getItem("todo"))||null,
    },
    reducers:{
        setData(state,action){
            state.data=action.payload;
            localStorage.setItem('todo',JSON.stringify(action.payload));
        },
        clearData(state,action){
            state.data=[];
            localStorage.setItem("todo",JSON.stringify([]));
        }
    }
})


export const actions=userSlice.actions;
export const todoactions=todoSlice.actions;

const userReducer=userSlice.reducer;
const todoReducer=todoSlice.reducer;

export const store=configureStore({
    reducer:{userReducer,todoReducer}
})
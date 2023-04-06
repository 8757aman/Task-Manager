import axios from 'axios'

export const fetchData=async(token)=>{
    const res=await axios.get('https://task-manager-5jql.onrender.com/Gettask', {headers: {
                token
            }});
        return res;
}

export const addTask=async(token,text)=>{
    await axios.post('https://task-manager-5jql.onrender.com/Addtask',{task:text},{headers:{token}});    
}

export const deleteTask=async(e_id,token)=>{
    await axios.delete(`https://task-manager-5jql.onrender.com/Deletetask/${e_id}`,{headers:{token}});
}

export const signupUser=async(username,email,password)=>{
    await axios.post('https://task-manager-5jql.onrender.com/Signup',{username,email,password});
}

export const loginUser=async(username,password)=>{
    await axios.post('https://task-manager-5jql.onrender.com/Login',{username,password});
}

export const getOneTask=async(params,token)=>{
    const res=await axios.get(`https://task-manager-5jql.onrender.com/Getonetask/${params}`,{headers:{token}})
    return res;
}

export const editOneTask=async(params,token,task)=>{
    await axios.put(`https://task-manager-5jql.onrender.com/Updatetask/${params}`,{task:task},{headers:{token}});
}
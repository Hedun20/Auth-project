import React,{FC, useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import { iUser } from './models/iUser';

const App:FC=()=>{
  const{store}= useContext(Context);
  const [user , setUser] = useState<iUser[]>([]);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth();
    }

  },[])
  async function getUsers(){
    try{
      const response  =await UserService.fetchUser()
      setUser(response.data);
    }catch(error){
      console.log(error);
    }
  }
  if(store.isLoading)return<div>Загрузка...</div>
  if(!store.isAuth){
    return(
    
    <div>
      <LoginForm/>
      <button onClick={getUsers}>Получить список Пользователей</button>
      </div>
    )
  }
  
  return(
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}`:`АВТОРИЗИРУЙТЕСЬ`}</h1>
      <h1>{store.user.isAcivated?`Аккаунт подтвержден по почте` : `ПОДТВЕРДИТЕ АККАУНТ!!!!`}</h1>
      <button onClick={()=> store.logout()}>ВЫЙТИ</button>
      <div><button onClick={getUsers}>Получить список Пользователей</button></div>
      {user.map(user =>
      <div key={user.email}>{user.email}</div>
      )}
    </div>
    
  )
}

export default observer (App);

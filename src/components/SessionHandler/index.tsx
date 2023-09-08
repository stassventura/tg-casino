import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUser, setUserTrue, setLoadingFalse } from '../../redux/slices/UserSlice';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langList from "../../db/langList.json"
import axios from 'axios';

declare const window: any;

// const user = {
//     id: '45893954389',
//     balance: 0.00,
//     avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
//     lang: "en",
//     name: "Robert",
// } 

const SessionHandler = () => {
  const [userDetails, setUserDetails] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
   let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

   if(tg?.initDataUnsafe?.user){
    const lang = tg.initDataUnsafe.user.language_code;
    const id = tg.initDataUnsafe.user.id.toString();
    const name = tg.initDataUnsafe.user.first_name;
    const defaultAvatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

    if(id){
      axios.post(`${process.env.REACT_APP_SERVER_URL}/items`, {user_id: id.toString()}).then((res)=>{
        console.log(res.data)
        const data = res.data;
        let user ={
          id,
          balance: data.balance,
          avatar: data.image === 'None' ? defaultAvatar : data.image,
          lang: lang === 'en' || lang === 'ru' ? lang : 'en',
          name: name,
        }
            dispatch(setUser(user));
            if (lang !== "en") {
                i18n.use(initReactI18next).init({
                    lng: lang,
                });
            }
            dispatch(setUserTrue());
            setTimeout(() => {
                dispatch(setLoadingFalse());
            }, 1000);
        
      })
      // dispatch(setLoadingFalse());
     }
   }
   
  }, [dispatch])
  

  
  return (null)
}

export default SessionHandler

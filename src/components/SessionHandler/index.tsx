import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation  } from 'react-router-dom';
import { setUser, setUserTrue, setLoadingFalse } from '../../redux/slices/UserSlice';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langList from "../../db/langList.json"
import axios from 'axios';

declare const window: any;

const SessionHandler = () => {
  const [userDetails, setUserDetails] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      window.Telegram.WebApp.BackButton.hide();
    } else {
      window.Telegram.WebApp.BackButton.show();

       const handleBackButtonClick = () => {
      navigate(-1)
      };

    window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    }
  }, [location, navigate]);

  useEffect(() => {
   let tg = window.Telegram.WebApp; 

   if(tg?.initDataUnsafe?.user){
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.isClosingConfirmationEnabled = true;
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

import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setUser, setUserTrue, setLoadingFalse } from '../../redux/slices/UserSlice';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langList from "../../db/langList.json"
declare const window: any;

const testUser = {
    id: '45893954389',
    balance: 0.00,
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    lang: "en",
    name: "Robert",
} 
const SessionHandler = () => {
  const dispatch = useDispatch()
  let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

  useEffect(() => {
     if(tg){
      const lang = tg.initDataUnsafe.user.language_code;
      const id = tg.initDataUnsafe.user.id;
      const balance = 0.00;
      const avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
      const name = tg.initDataUnsafe.user.first_name

      if(langList.includes(lang.toLowerCase())){
        const user = {
          id: id,
          balance: balance,
          avatar: avatar,
          lang: lang,
          name: name
        }
        dispatch(setUser(user))
        i18n
        .use(initReactI18next) 
        .init({
          lng: lang,
        });
      }else{
        const user = {
          id: tg.initDataUnsafe.user.id,
          balance: 0,
          avatar: avatar,
          lang: "en",
          name: tg.initDataUnsafe.user.first_name,
        }
        dispatch(setUser(user))
      }
        dispatch(setUserTrue())
        setTimeout(() => {
            dispatch(setLoadingFalse())
            
        }, 1000);
     }
  
  }, [dispatch])
  
  return (null)
}

export default SessionHandler

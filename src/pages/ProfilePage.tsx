import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTranslation } from 'react-i18next';
import langList from "../db/langList.json"
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setLanguage } from '../redux/slices/UserSlice';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  const dispatch = useDispatch()
  const isUser = useSelector((state: RootState) => state.User.isUser);
  const user = useSelector((state: RootState) => state.User.user);
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [autoWithdrawals, setAutoWithdrawals] = useState(true)
  const { t } = useTranslation();

  if(!isUser){
    return null
  }

  const onLangItemClick = (lang: string) =>{
    dispatch(setLanguage(lang))
    setIsDropdownActive(false)
    i18n
      .use(initReactI18next) 
      .init({
        lng: lang,
    });
  }
  return (
    <div className='user-profile'>
      <div className="container">
      
        <div className="profile-details">
          <div className="avatar">
          <img src={user.avatar} alt="avatar" />
            <LazyLoadImage
              alt={`avatar`}
              height={'60px'}
              effect="blur"
              src={user.avatar} 
              width={'100%'} 
            />
          </div>
          <div className="profile-content">
            <div className="profile-details-wrapper">
              <div className="user-name">
              {user.name}
              </div>
              <div className="user-lvl">
                LVL 1
              </div>
            </div>
            <div className="progress-bar-track">
                <div className="progress-value">
                  25%
                </div>
            </div>
          </div>
        </div>
       <Link to={'/profile/refferal-system'}>
        <div className="reff-system">
         <div className="ref-icon">
           <svg className="mx-2" width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.25 3.49994C3.24993 2.83157 3.45593 2.17943 3.83993 1.63238C4.22393 1.08533 4.76725 0.669972 5.39587 0.442905C6.02449 0.215837 6.70783 0.188101 7.35278 0.363478C7.99773 0.538854 8.57293 0.908813 9 1.42295C9.5274 0.783565 10.2791 0.36984 11.1015 0.266391C11.9238 0.162942 12.7546 0.377587 13.424 0.866423C14.0933 1.35526 14.5506 2.08135 14.7022 2.89618C14.8539 3.711 14.6886 4.553 14.24 5.24995H15C15.7293 5.24995 16.4288 5.53968 16.9445 6.0554C17.4603 6.57113 17.75 7.2706 17.75 7.99995V9.99994C17.7502 10.3825 17.6251 10.7546 17.3937 11.0593C17.1624 11.3639 16.8376 11.5844 16.469 11.6869C16.613 13.5129 16.529 15.3519 16.219 17.1599C16.1289 17.6853 15.8705 18.1672 15.4827 18.533C15.0949 18.8988 14.5988 19.1286 14.069 19.1879L13.154 19.2899C10.3929 19.5985 7.60607 19.5985 4.845 19.2899L3.931 19.1879C3.40124 19.1286 2.9051 18.8988 2.51732 18.533C2.12954 18.1672 1.87112 17.6853 1.781 17.1599C1.4711 15.353 1.38712 13.5146 1.531 11.6869C1.16244 11.5844 0.837622 11.3639 0.606271 11.0593C0.374919 10.7546 0.249778 10.3825 0.25 9.99994V7.99995C0.25 7.2706 0.539731 6.57113 1.05546 6.0554C1.57118 5.53968 2.27065 5.24995 3 5.24995H3.76C3.42577 4.72755 3.24875 4.1201 3.25 3.49994ZM8.25 3.49994C8.25 3.03582 8.06563 2.5907 7.73744 2.26251C7.40925 1.93432 6.96413 1.74994 6.5 1.74994C6.03587 1.74994 5.59075 1.93432 5.26256 2.26251C4.93437 2.5907 4.75 3.03582 4.75 3.49994C4.75 3.96407 4.93437 4.40919 5.26256 4.73738C5.59075 5.06557 6.03587 5.24995 6.5 5.24995C6.96413 5.24995 7.40925 5.06557 7.73744 4.73738C8.06563 4.40919 8.25 3.96407 8.25 3.49994ZM11.5 5.24995C11.7298 5.24995 11.9574 5.20468 12.1697 5.11673C12.382 5.02879 12.5749 4.89988 12.7374 4.73738C12.8999 4.57488 13.0288 4.38196 13.1168 4.16964C13.2047 3.95732 13.25 3.72976 13.25 3.49994C13.25 3.27013 13.2047 3.04257 13.1168 2.83025C13.0288 2.61793 12.8999 2.42501 12.7374 2.26251C12.5749 2.10001 12.382 1.9711 12.1697 1.88316C11.9574 1.79521 11.7298 1.74994 11.5 1.74994C11.0359 1.74994 10.5908 1.93432 10.2626 2.26251C9.93437 2.5907 9.75 3.03582 9.75 3.49994C9.75 3.96407 9.93437 4.40919 10.2626 4.73738C10.5908 5.06557 11.0359 5.24995 11.5 5.24995ZM1.75 7.99995C1.75 7.30995 2.31 6.74995 3 6.74995H8.25V10.2499H2C1.9337 10.2499 1.87011 10.2236 1.82322 10.1767C1.77634 10.1298 1.75 10.0662 1.75 9.99994V7.99995ZM9.75 11.7499H14.969C15.109 13.4699 15.033 15.2029 14.741 16.9059C14.7058 17.1109 14.605 17.2989 14.4537 17.4416C14.3023 17.5843 14.1087 17.6739 13.902 17.6969L12.988 17.7999C11.912 17.9199 10.831 17.9909 9.75 18.0139V11.7499ZM9.75 10.2499H16C16.0663 10.2499 16.1299 10.2236 16.1768 10.1767C16.2237 10.1298 16.25 10.0662 16.25 9.99994V7.99995C16.25 7.30995 15.69 6.74995 15 6.74995H9.75V10.2499ZM8.25 11.7499V18.0139C7.16799 17.9914 6.08756 17.92 5.012 17.7999L4.098 17.6969C3.89143 17.674 3.69792 17.5845 3.5466 17.442C3.39529 17.2995 3.29435 17.1118 3.259 16.9069C2.9672 15.2043 2.8906 13.4717 3.031 11.7499H8.25Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.25 3.49994C3.24993 2.83157 3.45593 2.17943 3.83993 1.63238C4.22393 1.08533 4.76725 0.669972 5.39587 0.442905C6.02449 0.215837 6.70783 0.188101 7.35278 0.363478C7.99773 0.538854 8.57293 0.908813 9 1.42295C9.5274 0.783565 10.2791 0.36984 11.1015 0.266391C11.9238 0.162942 12.7546 0.377587 13.424 0.866423C14.0933 1.35526 14.5506 2.08135 14.7022 2.89618C14.8539 3.711 14.6886 4.553 14.24 5.24995H15C15.7293 5.24995 16.4288 5.53968 16.9445 6.0554C17.4603 6.57113 17.75 7.2706 17.75 7.99995V9.99994C17.7502 10.3825 17.6251 10.7546 17.3937 11.0593C17.1624 11.3639 16.8376 11.5844 16.469 11.6869C16.613 13.5129 16.529 15.3519 16.219 17.1599C16.1289 17.6853 15.8705 18.1672 15.4827 18.533C15.0949 18.8988 14.5988 19.1286 14.069 19.1879L13.154 19.2899C10.3929 19.5985 7.60607 19.5985 4.845 19.2899L3.931 19.1879C3.40124 19.1286 2.9051 18.8988 2.51732 18.533C2.12954 18.1672 1.87112 17.6853 1.781 17.1599C1.4711 15.353 1.38712 13.5146 1.531 11.6869C1.16244 11.5844 0.837622 11.3639 0.606271 11.0593C0.374919 10.7546 0.249778 10.3825 0.25 9.99994V7.99995C0.25 7.2706 0.539731 6.57113 1.05546 6.0554C1.57118 5.53968 2.27065 5.24995 3 5.24995H3.76C3.42577 4.72755 3.24875 4.1201 3.25 3.49994ZM8.25 3.49994C8.25 3.03582 8.06563 2.5907 7.73744 2.26251C7.40925 1.93432 6.96413 1.74994 6.5 1.74994C6.03587 1.74994 5.59075 1.93432 5.26256 2.26251C4.93437 2.5907 4.75 3.03582 4.75 3.49994C4.75 3.96407 4.93437 4.40919 5.26256 4.73738C5.59075 5.06557 6.03587 5.24995 6.5 5.24995C6.96413 5.24995 7.40925 5.06557 7.73744 4.73738C8.06563 4.40919 8.25 3.96407 8.25 3.49994ZM11.5 5.24995C11.7298 5.24995 11.9574 5.20468 12.1697 5.11673C12.382 5.02879 12.5749 4.89988 12.7374 4.73738C12.8999 4.57488 13.0288 4.38196 13.1168 4.16964C13.2047 3.95732 13.25 3.72976 13.25 3.49994C13.25 3.27013 13.2047 3.04257 13.1168 2.83025C13.0288 2.61793 12.8999 2.42501 12.7374 2.26251C12.5749 2.10001 12.382 1.9711 12.1697 1.88316C11.9574 1.79521 11.7298 1.74994 11.5 1.74994C11.0359 1.74994 10.5908 1.93432 10.2626 2.26251C9.93437 2.5907 9.75 3.03582 9.75 3.49994C9.75 3.96407 9.93437 4.40919 10.2626 4.73738C10.5908 5.06557 11.0359 5.24995 11.5 5.24995ZM1.75 7.99995C1.75 7.30995 2.31 6.74995 3 6.74995H8.25V10.2499H2C1.9337 10.2499 1.87011 10.2236 1.82322 10.1767C1.77634 10.1298 1.75 10.0662 1.75 9.99994V7.99995ZM9.75 11.7499H14.969C15.109 13.4699 15.033 15.2029 14.741 16.9059C14.7058 17.1109 14.605 17.2989 14.4537 17.4416C14.3023 17.5843 14.1087 17.6739 13.902 17.6969L12.988 17.7999C11.912 17.9199 10.831 17.9909 9.75 18.0139V11.7499ZM9.75 10.2499H16C16.0663 10.2499 16.1299 10.2236 16.1768 10.1767C16.2237 10.1298 16.25 10.0662 16.25 9.99994V7.99995C16.25 7.30995 15.69 6.74995 15 6.74995H9.75V10.2499ZM8.25 11.7499V18.0139C7.16799 17.9914 6.08756 17.92 5.012 17.7999L4.098 17.6969C3.89143 17.674 3.69792 17.5845 3.5466 17.442C3.39529 17.2995 3.29435 17.1118 3.259 16.9069C2.9672 15.2043 2.8906 13.4717 3.031 11.7499H8.25Z" fill="url(#paint0_radial_3_5245)"></path><defs><radialGradient id="paint0_radial_3_5245" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 21.8) rotate(-90) scale(22.0849 20.0455)"><stop stopColor="#2F3EC8"></stop><stop offset="1" stopColor="#637AF4"></stop></radialGradient></defs></svg>
         </div>
         <span>{t('earn-10-percent')}</span>
        </div>
       </Link>
        
        <h1 className="title">{t('settings')}</h1>
        <div className="settings-wrapper">
          <div className="settings-item">
            <span>{t('auto-withdrawals')}</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={autoWithdrawals}
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  setAutoWithdrawals(isChecked)
                }}/>
              <span className="slider"></span>
            </label>
          </div>
          <div className="settings-item">
            <span>{t('withdraws')}</span>
            {autoWithdrawals ? (<>
              <button className='withdrawal-btn'>
                  {t('automatically')}
              </button>
            </>): <>
            {user.balance > 0 ? <>
              <button className='withdrawal-btn --windraw'>
                  {t('withdraw')}
              </button>
            </> : <>
            <button className='withdrawal-btn zero-balance'>
                  {">="} 1 TON {t('required')}
              </button>
            </>}
           
            
            </>}
            
          </div>
          <div className="settings-item">
            <span>{t('language')}</span>
             <div className="dropdown">
              <div className="selected-lang" onClick={()=>setIsDropdownActive(!isDropdownActive)}>
                {t((user.lang).toLocaleLowerCase())}
                <img src="./images/chevron-down.svg" alt="" />
              </div>
              <OutsideClickHandler onOutsideClick={()=>setIsDropdownActive(false)}>
              <ul className={`dropdown-menu ${isDropdownActive ? '--drop-active' : ''}`}>
                 
                  {langList.map((lang)=>(
                    <li key={lang} className="lang-item" onClick={()=>onLangItemClick(lang)}>
                      {t(lang)}
                    </li>
                  ))}
              </ul>
              </OutsideClickHandler>
             </div>
          </div>
        </div>
       
        <h1 className="title">{t('transactions')}</h1>
          <div className="transation-list">
            <div className="empty">
              {t('not-found')}
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProfilePage

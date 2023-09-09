import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const user = useSelector((state: RootState) => state.User.user);
  const isUser = useSelector((state: RootState) => state.User.isUser);
  const { t } = useTranslation();

  return (
    <>
    <header>
      <div className="header">
        <Link to={'/'}>
          <div className="header-logo">
              <img src="https://whale-tg-cdn-04.b-cdn.net/1.png" alt="" />
          </div>
        </Link>
        <div className="actions">
            {isUser ? (
              <Link to={'/profile/deposit'}>
                <button className="deposit-btn">{t('deposit')}</button>
              </Link>
            ) : (
              <button className="register-btn">
                  {t('signUp')}
              </button>
            )} 
            {isUser ? (
               <Link to={'/profile/deposit'}>
                <div className="balance">
                <div className="currency">
                    <img src="https://seeklogo.com/images/T/toncoin-ton-logo-DBE22B2DFB-seeklogo.com.png" alt="" />
                </div>
                <div className="amount">{user.balance.toFixed(2)}</div>
             </div>
             </Link>
            
            ) : (
              <button className="login-btn">{t('login')}</button>
            )} 
            
            {isUser && user ? (
             <Link to={'/profile'}>
              <div className="user">
                <img src={user.avatar} alt="img" />
              </div>
             </Link>
            ) : null} 
        </div>
      </div>
    </header>

    <div className="header-devider"></div>
    </>
  )
}

export default Header

import React, {useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';

const statisicDate = [
    "last-month",
    "this-month",
    "all-time",
]
const ReferralSystemPage = () => {
    const user = useSelector((state: RootState) => state.User.user);
    const isUser = useSelector((state: RootState) => state.User.isUser);
    const [isCopied, setIsCopied] = useState(false);
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState('last-month')
    if(!isUser){
        return null
    }

    const copyToClipboard = () => {
        const textToCopy = `whale.io/?start=${user.id}`;
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000); // После 2 секунд вернуть кнопку в исходное состояние
    };

  return (
    <div className='refferal-system'>
      <div className="container">
        <div className="earn-banner">
        {isUser && user ? (
                <>
                  <LazyLoadImage
                  alt={`play-earn`}
                  height={'200px'}
                  effect="blur"
                  src={`https://whale-tg-cdn-04.b-cdn.net/locales/${user.lang}/earn_commission.png`} 
                  width={'100%'} 
                  />
                </>) : (
                <>
                <LazyLoadImage
                  alt={`play-earn`}
                  height={'200px'}
                  effect="blur"
                  src={`https://whale-tg-cdn-04.b-cdn.net/locales/en/earn_commission.png`} 
                  width={'100%'} 
                  />
                </>)}
        </div>
        <div className="warning">
            <div className="icon">
                <svg className="svg-inline--fa fa-triangle-exclamation text-xl text-[#657cff] ml-1" aria-hidden="true" focusable="false" data-prefix="far" data-icon="triangle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="#657cff" d="M248.4 84.3c1.6-2.7 4.5-4.3 7.6-4.3s6 1.6 7.6 4.3L461.9 410c1.4 2.3 2.1 4.9 2.1 7.5c0 8-6.5 14.5-14.5 14.5H62.5c-8 0-14.5-6.5-14.5-14.5c0-2.7 .7-5.3 2.1-7.5L248.4 84.3zm-41-25L9.1 385c-6 9.8-9.1 21-9.1 32.5C0 452 28 480 62.5 480h387c34.5 0 62.5-28 62.5-62.5c0-11.5-3.2-22.7-9.1-32.5L304.6 59.3C294.3 42.4 275.9 32 256 32s-38.3 10.4-48.6 27.3zM288 368a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-8-184c0-13.3-10.7-24-24-24s-24 10.7-24 24v96c0 13.3 10.7 24 24 24s24-10.7 24-24V184z"></path></svg>
            </div>
            {t('earn-warning')}
        </div>
        <div className="referral-link-block">
            <div className="title">
            {t('your-rererral')}
            </div>
            <div className="description">
            {t('earn-percent')}
            </div>
            <div className="link" onClick={copyToClipboard}>
                whale.io/?start={user.id}
            </div>
            <div className="actions">
                <button className='copy-link' onClick={copyToClipboard}>
                    {isCopied ? t('copied') : t('copy')}
                </button>
                <button className='share-link'> {t('share')}</button>
            </div>
        </div>

        <div className='statystic-block'>
            <h3 className="title">{t('statistic')}</h3>
            <ul className="tabs-list">
                {statisicDate.map((item)=>(
                    <li className={`tab-item ${selectedPeriod === item ? '--active-tab':''}`} key={item} onClick={()=>setSelectedPeriod(item)}>
                        {t(`${item}`)}    
                    </li>
                ))}
            </ul>
            <div className='tabs-body'>
                <div className="tab-body-item">
                    {t('your-earnings')}
                    <span className='count'>
                        <img src="https://seeklogo.com/images/T/toncoin-ton-logo-DBE22B2DFB-seeklogo.com.png" alt="" />
                        0
                    </span>
                </div>
                <div className="tab-body-item">
                    {t('total-amount-of-bets')}
                    <span className='count'>
                        <img src="https://seeklogo.com/images/T/toncoin-ton-logo-DBE22B2DFB-seeklogo.com.png" alt="" />
                        0
                    </span>
                </div>
                
            </div>
        </div>
        <div className="earn-banner">
        {isUser && user ? (
                <>
                  <LazyLoadImage
                  alt={`play-earn`}
                  height={'200px'}
                  effect="blur"
                  src={`https://whale-tg-cdn-04.b-cdn.net/locales/${user.lang}/earn_more.png`} 
                  width={'100%'} 
                  />
                </>) : (
                <>
                <LazyLoadImage
                  alt={`play-earn`}
                  height={'200px'}
                  effect="blur"
                  src={`https://whale-tg-cdn-04.b-cdn.net/locales/en/earn_more.png`} 
                  width={'100%'} 
                  />
                </>)}
        </div>
      </div>
    </div>
  )
}

export default ReferralSystemPage

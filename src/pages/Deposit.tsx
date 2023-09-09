import React, {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import OutsideClickHandler from 'react-outside-click-handler';

declare const window: any;

const popularAmount = [
  '5', '10', '20', '50', '100', '150', '200', '250',  
]
const paymentMethods = [
  {
    image: 'https://i.ibb.co/G5BdDY1/logo.jpg',
    name: '@CryptoBot'
  },
  
]
const Deposit = () => {
  const navigate = useNavigate()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = useSelector((state: RootState) => state.User.user);
  const isUser = useSelector((state: RootState) => state.User.isUser);
  const [amount, setAmount] = useState("10")
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const { t } = useTranslation();

  useEffect(() => {
    if (error !== '') {
        setTimeout(() => {
            setError('')
        }, 1000);
    }
    if (Number(amount) < 0) {
        setAmount('0');
    }
}, [error, amount]);
  
  const amountHandler = (e: any) => {
    const inputedValue = e.target.value;

    // Запрещаем ввод отрицательных чисел
    if (inputedValue.startsWith('-')) return;

    if (inputedValue.length <= 5) {
        setAmount(inputedValue);
    }
};

  const onDepositClick = () =>{
    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
        return setError(t('dep-error'));
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/pay`, {
      amount,
      user_id: user.id
    }).then((res: any)=>{
      window.Telegram.WebApp.openTelegramLink(res.data.url)
    })
    console.log(amount, user.id)
  }
  return (
    <>
      <div className="deposit-wrapper">
        <div className="deposit-container">
          
          <div className="deposit-body">
            <div className="input-amount-wrapper">
              <input type="number" className='amount' value={amount} onChange={(e)=>amountHandler(e)}/>
              <div className="currency" onClick={()=>setIsPopupOpen(true)}>
                  <div className="currency-img">
                  <img src="https://seeklogo.com/images/T/toncoin-ton-logo-DBE22B2DFB-seeklogo.com.png" alt="currency" />
                  </div>
                  <div className="currency-symbol">TON </div>
                  <svg width="14px" height="14px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="#ffffff"></path> </g></svg>
              </div>
            </div>
            <div className="popular-amount-wrapper">
              {popularAmount.map((item)=>(
                <div key={item} className='amount-item' onClick={()=>setAmount(item)}>{item}</div>
              ))}
            </div>
            <div className="payment-methods">
              {paymentMethods.map((item)=>(
                <div className={`payment-item ${item.name === '@CryptoBot' ? 'activeMethod': 'inactive'}`} key={item.name}>
                  <img src={item.image} alt={Image.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <button className='deposit-btn' onClick={()=>onDepositClick()}>{t('deposit')}</button>
            {error !== '' && <p className="error">{error}</p>}
            {url !== '' && <p className="error">{url}</p>}
          </div>
        </div>
          <div className="currencies">
            <div className="currency">
              <img src="https://whale-tg-cdn-04.b-cdn.net/logos/tether.svg" alt="currency" />
            </div>
            <div className="currency">
              <img src="https://whale-tg-cdn-04.b-cdn.net/logos/ton.svg" alt="currency" />
            </div>
          </div>
      </div>
     
      <div className={`select-currency-popup-wrapper ${isPopupOpen ? 'popup_open' : ''}`}>
      <OutsideClickHandler onOutsideClick={()=>setIsPopupOpen(false)}>
                <div className="select-currency-popup">
                  <div className="title">
                    Выберите вашу предпочтительную валюту
                  </div>
                  <p className='right-secured'>
                    Все права защищены
                  </p>

                  <button className="currency-method selected-currency" onClick={()=>setIsPopupOpen(false)}>
                    <div className="icon">
                    <img src="https://seeklogo.com/images/T/toncoin-ton-logo-DBE22B2DFB-seeklogo.com.png" alt="ton" />
                    </div>
                    <div className="currency">
                      <span className='name'>Тонкойн</span>
                      <span className='symbol'>TON</span>
                    </div>
                    <div className="amount">{isUser && user.balance} TON</div>
                  </button>
                  <button className="currency-method">
                    <div className="icon">
                    <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=026" alt="ton" />
                    </div>
                    <div className="currency">
                      <span className='name'>Tether</span>
                      <span className='symbol'>USDT</span>
                    </div>
                    <div className="amount">0.00 $</div>
                    <div className="terms-conditions">
                      <img src="/images/settings.png" alt=" terms" />
                      <span>Условия и положения</span>
                    </div>
                  </button>
                  <button className="currency-method">
                    <div className="icon">
                    <img src="https://seeklogo.com/images/E/ethereum-blue-logo-8BC914153E-seeklogo.com.png" alt="ton" />
                    </div>
                    <div className="currency">
                      <span className='name'>Ethereum</span>
                      <span className='symbol'>ETH</span>
                    </div>
                    <div className="amount">0.00 ETH</div>
                    <div className="terms-conditions">
                      <img src="/images/settings.png" alt=" terms" />
                      <span>Условия и положения</span>
                    </div>
                  </button>
                </div>
      </OutsideClickHandler>

        </div>
       
    </>
  )
}

export default Deposit

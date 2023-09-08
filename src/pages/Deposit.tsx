import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
declare const window: any;

const popularAmount = [
  '5', '10', '20', '50', '100', '150', '200', '250',  
]
const paymentMethods = [
  {
    image: 'https://i.ibb.co/G5BdDY1/logo.jpg',
    name: '@CryptoBot'
  },
  {
    image: 'https://i.ibb.co/LCQpKhr/wallet.jpg',
    name: '@Wallet'
  }
]
const Deposit = () => {
  const navigate = useNavigate()
  const [amount, setAmount] = useState("10")
  const [error, setError] = useState('')
  const user = useSelector((state: RootState) => state.User.user);
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
    <div>
      <div className="deposit-wrapper">
        <div className="deposit-container">
          <div className="deposit-sections">
            <div className="section-item active deposit">{t('deposit')}</div>
            <div className="section-item buy">{t('buy-crypto')}</div>
          </div>
          <div className="deposit-body">
            <div className="input-amount-wrapper">
              <input type="number" className='amount' value={amount} onChange={(e)=>amountHandler(e)}/>
              <div className="currency">
                  <div className="currency-img">
                  <img src="https://seeklogo.com/images/T/toncoin-ton-logo-DBE22B2DFB-seeklogo.com.png" alt="currency" />
                  </div>
                  <div className="currency-symbol">TON</div>
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
    </div>
  )
}

export default Deposit

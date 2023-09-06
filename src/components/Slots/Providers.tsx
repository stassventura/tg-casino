import React, {  useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const providers = [
    {name: 'novomatic', img: 'https://i.ibb.co/b6Y11B9/1553789730-NOVOMATIC-removebg-preview.png'},
    {name: 'isoftbet', img: 'https://www.canadacasinohub.com/wp-content/uploads/2022/03/isoftbet-logo.png'},
    {name: 'playtech', img: 'https://i.ibb.co/6v9MDzm/Playtech-Logo-Black-removebg-preview.png'},
    {name: 'playngo', img: 'https://i.ibb.co/C8J8Zvx/PLAYNGO-LOGO-removebg-preview.png'},
    {name: 'hacksaw', img: 'https://i.ibb.co/LtH9K92/Hacksaw-removebg-preview.png'},
    {name: 'nextgen', img: 'https://i.ibb.co/pPZwzVH/nextgen-1-removebg-preview.png'},
    {name: 'microgaming', img: 'https://www.canadacasinohub.com/wp-content/uploads/2021/02/microgaming-logo-wh.png'},
]
const Providers = () => {
    const slotsRef = useRef<HTMLDivElement | null>(null);
    const cardWidth = 160; 
    const { t } = useTranslation();

  return (
    <div className='slots-category-preview'>
    <h3 className='title'>
        <span>{t('by-provider')}</span>
        <div className="arrows">
            <button className="arrow arrow-left"
             onClick={() => {
                if (slotsRef.current) {
                    slotsRef.current.scrollLeft -= cardWidth; 
                }
            }}
            >
                <svg className="mx-auto h-2" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L1 5L6 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <button className="arrow arrow-right"
            onClick={() => {
                if (slotsRef.current) {
                    slotsRef.current.scrollLeft += cardWidth; 
                }
            }}
            >
                <svg className="mx-auto h-2" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 5L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
        </div>
    </h3>
    <div className="slots-list" ref={slotsRef}>
    {providers.map((provider) => (
        <Link to={`/${provider.name}/games`} key={provider.name} className={`slot-item`}
        >
            <LazyLoadImage
            alt={`${provider.name}`}
            height={'112px'}
            effect="blur"
            src={provider.img} 
            width={'150px'} 
            />
           
        </Link>
        ))}
    </div>
</div>
  )
}

export default Providers

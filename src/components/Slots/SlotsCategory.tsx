import React, { useState, useEffect, useRef } from 'react';
import slots from '../../db/slots.json'
import OutsideClickHandler from 'react-outside-click-handler';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props{
    title: string,
    activeGame: number,
    setActiveGame: (value: number) => void,
    max: number,
    category: string
}

const SlotsCategory = ({title, activeGame, setActiveGame, max, category}: Props) => {
   const slotsRef = useRef<HTMLDivElement | null>(null);
   const cardWidth = 160;
   const { t } = useTranslation();

   const handleClickOutside = () => {
    setActiveGame(0);
  };
  return (
    <div className='slots-category-preview'>
        <h3 className='title'>
            <span>{title}</span>
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
        <OutsideClickHandler onOutsideClick={handleClickOutside}>
        <div className="slots-list" ref={slotsRef}>
        {slots
        .filter(item => item.category === category)
        .slice(0, max).map((item) => (
            <div key={item.id} className={`slot-item ${activeGame === item.id ? "focus" : ""}`} onClick={()=>activeGame !== item.id ? setActiveGame(item.id) : null}  data-game={item.id} 
            >
                <LazyLoadImage
                alt={`${item.name}`}
                height={'112px'}
                effect="blur"
                src={item.img} 
                width={'150px'} 
                />
                <div className="card-actions">
                    <Link className='btn-play' to={`/play/${item.slug}`}>
                            {t('play')}
                    </Link>
                    {item.category !== 'buy-feature' && item.category !== 'casino' && item.category !== 'table'?(
                    <Link to={`/play/demo/${item.slug}`} className='btn-play demo'>
                            {t('demo')}
                    </Link>
                    ) : null}
                    
                </div>
            </div>
            ))}
        </div>
        </OutsideClickHandler>

       
    </div>
  )
}

export default SlotsCategory

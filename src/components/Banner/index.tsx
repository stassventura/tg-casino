import React from 'react'
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
interface Props {
  banners: string[]; // Тип массива строк

}
const Banner = ({ banners }: Props) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.User.user);
  const isUser = useSelector((state: RootState) => state.User.isUser);

  return (
    <section>
        <div className="banner-container">
        {banners.map((banner, index) =>(
        <div className={`banner-item ${banner}`} key={index}>
          {banner === 'game-of-week' ? (
          <div className="banner-content-game-of-week">
            <div className="title">{t('game-of-week1')} <br /> {t('game-of-week2')}
            </div>
            <Link to={'/play/mayan-stackways'}>
              <button className="btn-play">{t('play')}</button>
            </Link>
            <div className="game">
              <LazyLoadImage
                alt={`play-earn`}
                height={'100%'}
                effect="blur"
                src={`https://cdn.vegasgod.com/hacksaw/mayan-stackways/cover.webp`} 
                width={'100%'} 
              />
            </div>
          </div>
          ) : null}
          {banner === 'our-choice' ? (
          <div className="banner-content-choice">
            <div className="title">{t('whale-s')} <br /> {t('choice')}</div>
            <Link to={'/play/cash-compass'}>
              <button className="btn-play">{t('play')}</button>
            </Link>
            <div className="game">
              <LazyLoadImage
                alt={`play-earn`}
                height={'100%'}
                effect="blur"
                src={`https://cdn.vegasgod.com/hacksaw/cash-compass/cover.webp`} 
                width={'100%'} 
              />
            </div>
          </div>
          ) : null}
          {banner === 'play-earn' ? (
              <>
                {isUser && user ? (
                <>
                  <LazyLoadImage
                  alt={`play-earn`}
                  height={'200px'}
                  effect="blur"
                  src={`https://whale-tg-cdn-04.b-cdn.net/locales/${user.lang}/earn_play.png`} 
                  width={'100%'} 
                  />
                </>) : (
                <>
                <LazyLoadImage
                  alt={`play-earn`}
                  height={'200px'}
                  effect="blur"
                  src={`https://whale-tg-cdn-04.b-cdn.net/locales/en/earn_play.png`} 
                  width={'100%'} 
                  />
                </>)}
              
              </>
          ) : null} 
           {banner === 'games-avaliable' ? (
            <LazyLoadImage
              alt={`play-earn`}
              height={'200px'}
              effect="blur"
              src={`https://whale-tg-cdn-04.b-cdn.net/banner_4.png`} 
              width={'100%'} 
              />
          ) : null} 
          
        </div>
        ))}
        </div>
  </section>
  )
}

export default Banner

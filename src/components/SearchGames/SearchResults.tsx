import React, {useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import { useNavigate } from 'react-router-dom';
type Game = {
    id: number;
    img: string;
    name: string;
    link: string;
    slug: string;
    provider: string;
    iframe: string;
    category: string;
  };

interface Props{
    searchResults: Game[]
}
const SearchResults = ({searchResults}: Props) => {
  const [activeGame, setActiveGame] = useState(0)
  const { t } = useTranslation();
  const navigate = useNavigate()
  return (
    <div className='searchResults-container'>
        <div className="search-results">
            
            {searchResults.length > 0 ? (
            <>
            {searchResults
            .slice(0, 5)
            .map((item)=>(
                <div className="search--item" key={item.id}>
                <div className={`-card-actions ${activeGame === item.id ? '--active' : ''}`}>
                   <button className='btn play' onClick={()=>navigate(`/play/${item.slug}`)}>{t('play')}</button> 
                   {item.category !== 'buy-feature' && item.category !== 'casino' && item.category !== 'table' ? (
                        <button className='btn play-demo' onClick={()=>navigate(`/play/demo/${item.slug}`)}>{t('demo')}</button> 
                   ) : null}
                </div>
                <OutsideClickHandler onOutsideClick={()=>setActiveGame(0)}>
                <div className={`item-picture`} onClick={()=>setActiveGame(item.id)}>
                    <>
                    <LazyLoadImage
                    alt={`${item.name}`}
                    height={'112px'}
                    effect="blur"
                    src={item.img} 
                    width={'108px'} 
                    />
                    </>
                </div>  
                </OutsideClickHandler>
                <div className="description">
                    <div className="game-name" onClick={()=>setActiveGame(item.id)}>
                        {item.name} 
                    </div>
                    <div className="game-provider">
                        {item.provider}
                    </div>
                </div>
            </div>
            ))}
            </>
        ): null}
        </div>
    </div>
  )
}

export default SearchResults

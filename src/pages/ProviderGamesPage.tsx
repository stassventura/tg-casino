import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchGames from '../components/SearchGames/index';
import SearchResults from '../components/SearchGames/SearchResults';
import slots from '../db/slots.json'
import OutsideClickHandler from 'react-outside-click-handler';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';


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

const ProviderGamesPage = () => {
    const { provider } = useParams();
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [activeGame, setActiveGame] = useState(0)

    const filterSlotsByProvider = (provider: string): Promise<Game[]> => {
      return new Promise((resolve, reject) => {
        const gamesByProvider = slots.filter((item: Game) => item.provider === provider);
        if (gamesByProvider.length > 0) {
          resolve(gamesByProvider);  // Указываем, что операция успешно завершилась
        } else {
          navigate('/');  // Перенаправляем на главную страницу, так как игры не найдены
        }
      });
    };
    
    useEffect(() => {
      window.scrollTo(0, 0);
      if(provider){
        filterSlotsByProvider(provider)
        .then((filteredSlots) => {
          // Успешно полученные игры
          setGames(filteredSlots);
        })
        .catch((error) => {
          // Обработка ошибки
          console.error(error.message);
        });
      }
    }, [provider])
    
  return (
    <>
      <div className='search-games-wrapper'>
        <SearchGames setSearchResults={setSearchResults}/>
      </div>
      {searchResults.length > 0 && <SearchResults searchResults={searchResults}/>}
      <div className="by-provider-title" data-provider={provider}>
      {t('provider')} <span>{provider}</span> 
      </div>
      <div className="by-provider-games-container">
      {games.length > 0 ? (
        <>
          {games.map((game)=>(
            <div key={game.id} className='game-item' data-game={`${game.name}`} onClick={()=>setActiveGame(game.id)}>
               <LazyLoadImage
                alt={`${game.name}`}
                height={'112px'}
                effect="blur"
                src={game.img} 
                width={'100%'} 
                />
                <OutsideClickHandler onOutsideClick={()=>setActiveGame(0)}>
                <div className={`-game-actions ${activeGame === game.id ? '-ative' : ''}`}>
                <Link className='btn btn-play' to={`/play/${game.slug}`}>
                            {t('play')}
                </Link>
                {game.category !== 'buy-feature' && game.category !== 'casino' && game.category !== 'table'?(
                    <Link to={`/play/demo/${game.slug}`} className='btn play-demo'>
                            {t('demo')}
                    </Link>
                ) : null}
                </div>
                </OutsideClickHandler>
               
            </div>
          ))}
        </>
      ): null}
      </div>
    </>
  )
}

export default ProviderGamesPage

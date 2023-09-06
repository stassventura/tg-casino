import React, {useState} from 'react'
import Banner from '../components/Banner'
import SearchGames from '../components/SearchGames/index';
import Slots from '../components/Slots';
import SearchResults from '../components/SearchGames/SearchResults';

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

const HomePage = () => {
  const [searchResults, setSearchResults] = useState<Game[]>([]); // Используйте ваш актуальный тип

  const banners = ['game-of-week', 'play-earn', 'games-avaliable']
  return (
    <>
      <Banner banners={banners}/>
      <div className='search-games-wrapper'>
      <SearchGames setSearchResults={setSearchResults}/>
      </div>
      {searchResults.length > 0 && <SearchResults searchResults={searchResults}/>}
      

      <Slots/>
    </>
  )
}

export default HomePage

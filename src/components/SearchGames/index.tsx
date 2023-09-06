import React, {useEffect, useState} from 'react'
import slots from '../../db/slots.json'
import { useTranslation } from 'react-i18next';

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
  setSearchResults: (result: Game[]) => void;
  provider?: string; // Здесь указываем, что параметр provider является опциональным

}

const SearchGames = ({setSearchResults, provider } : Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useTranslation();
  const handleInputClick = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  useEffect(() => {
    if (searchQuery.length > 1) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      let matchedGames = slots.filter((slot) =>
        slot.name.toLowerCase().includes(lowerCaseSearchQuery)
      );

      if (provider) {
        matchedGames = matchedGames.filter((slot) => slot.provider === provider);
      }

      setSearchResults(matchedGames);
    }
    if (searchQuery.length === 0) {
      setSearchResults([]);
    }
  }, [searchQuery, provider, setSearchResults]);
  
  
  return (
    <>
      <div className="search-games-group">
            <input type="text" placeholder={t('gameSearch')} value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
            onClick={handleInputClick} 
            />
            <div className="search-icon">
                {searchQuery === '' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="#61638c"></path></svg>
                ) : (
                    <svg onClick={()=>setSearchQuery('')}  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="#61638c"></path><path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="#61638c"></path></svg>
                )}
                
            </div>
      </div>

     
    </>
  )
}

export default SearchGames

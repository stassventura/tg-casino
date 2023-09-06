import React, {useState} from 'react'
import Banner from '../Banner';
import Providers from './Providers';
import SlotsCategory from './SlotsCategory';
import { useTranslation } from 'react-i18next';

const Slots = () => {
  const [activeGame, setActiveGame] = useState(0)
  const { t } = useTranslation();
  const popularGamesCount = 30
  const firstBanner = [ 'our-choice', 'games-avaliable', 'play-earn']

  const secondBanner = ['play-earn', 'games-avaliable', 'our-choice' ]
  return (
    <>
    <section> 
      <div className="slots-container">
        <SlotsCategory title={t('popularGames') + " 🏆"} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"popular"}/>
        <SlotsCategory title={t('newArrivals')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"new"}/>
      </div>
    </section>
    <Banner banners={firstBanner}/>
    <div className="games-list-devider"></div>
    <section>
      <div className="slots-container">
        <SlotsCategory title={t('liveCasino')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"casino"}/>
        <SlotsCategory title={t('wildWest')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"wild-west"}/>
        <SlotsCategory title={t('slots')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"slots"}/>
        <SlotsCategory title={t('jewelry')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"jewelry"}/>
        <SlotsCategory title={t('fruits')+ " 🍇"} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"fruits"}/>
        <SlotsCategory title={t('mystical')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"fantasy"}/>

        <SlotsCategory title={t('megaways')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"megaways"}/>

      </div>
    </section>
    <Banner banners={secondBanner}/>
    <div className="games-list-devider"></div>
    <section>
      <div className="slots-container">
        <SlotsCategory title={t('buy-feature')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"buy-feature"}/>
        <SlotsCategory title={t('table-games')} activeGame={activeGame} setActiveGame={setActiveGame} max={popularGamesCount} category={"table"}/>
      <Providers/>
      </div>
    </section>
    </>
  )
}

export default Slots
 
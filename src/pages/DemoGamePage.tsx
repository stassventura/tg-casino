import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import slots from '../db/slots.json';
import { useTranslation } from 'react-i18next';

interface Game {
    id: number;
    img: string;
    name: string;
    link: string;
    slug: string;
    provider: string;
    iframe: string;
}
enum ScreenOrientation {
    PORTRAIT = 'portrait',
    LANDSCAPE = 'landscape'
}


function DemoGamePage() {
    const { slug } = useParams();
    const [game, setGame] = useState<Game | undefined>(); // Используем тип Game
    const [screenHeight, setScreenHeight] = useState(window.innerHeight - 105);
    const [iframeWidth, setIframeWidth] = useState('100%'); // Initial width is 100%
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [showRotateAnimation, setShowRotateAnimation] = useState(false);
    const [currentOrientation, setCurrentOrientation] = useState(ScreenOrientation.PORTRAIT);
    const rotationAnimationDuration = 3000; // Время показа анимации в миллисекундах

    // Внутри компонента DemoGamePage
        function getScreenOrientation() {
            return window.innerWidth > window.innerHeight
                ? ScreenOrientation.LANDSCAPE
                : ScreenOrientation.PORTRAIT;
        }

    useEffect(() => {
        if (slug) {
            const foundGame = slots.find(item => item.slug === slug);
            if (foundGame) {
                setGame(foundGame);
            }
        }
    }, [slug]);
    useEffect(() => {
        const handleResize = () => {
            const newScreenHeight = window.innerHeight;
            const newIframeHeight = window.innerWidth > window.innerHeight ? newScreenHeight - 8 : newScreenHeight - 13;
            setScreenHeight(newIframeHeight);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const newScreenHeight = window.innerHeight;
            const newIframeWidth = window.innerWidth > 1180 ? '1180px' : '100%'; 
            
            let newIframeHeight;
            
            if (window.innerWidth > 1180 && window.innerWidth > window.innerHeight) {
                // Landscape mode on a wider screen
                newIframeHeight = newScreenHeight - 120;
            } else {
                // Default height adjustments
                newIframeHeight = window.innerWidth > window.innerHeight ? newScreenHeight - 80 : newScreenHeight - 130;
            }
            
            setIframeWidth(newIframeWidth);
            setScreenHeight(newIframeHeight);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        const handleOrientationChange = () => {
            const newOrientation = getScreenOrientation();
            setCurrentOrientation(newOrientation);

            if (newOrientation === ScreenOrientation.PORTRAIT) {
                setShowRotateAnimation(true);
                setTimeout(() => {
                    setShowRotateAnimation(false);
                }, rotationAnimationDuration);
            } else {
                setShowRotateAnimation(false);
            }
        };

        handleOrientationChange();

        window.addEventListener('resize', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);


    return (
        <div>
            {game && (
                <>
                    <div className="back-to-main-from-demo">
                        <div className="container">
                        <button className='back-btn' onClick={()=>navigate(-1)}>
                            <svg className="mx-auto h-2" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L1 5L6 9" stroke="#58638c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <span>{t('back')}</span>
                        </button>
                        </div>
                        <div className="disclaimer">
                            {t('demo-version')} 
                        </div>
                        </div>
                    <div className="game-container" >
                        <iframe src={`${game.iframe}`} title={`${game.name}`} width={iframeWidth} height={`100%`}></iframe>
                        {/* ${screenHeight}px */}
                    </div>
                    <div className="rotate-phone" style={{ display: showRotateAnimation ? 'block' : 'none' }}>
                        <img src="https://media1.giphy.com/media/XXU2vaPVrnhV7ZAGpY/giphy.gif?cid=6c09b9524903ccb923bf21e48abbbdb1c8b89c0e11683b50&rid=giphy.gif&ct=s" alt="" />
                    </div>
                </>
            )}
        </div>
    );
}

export default DemoGamePage;

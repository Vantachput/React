import React from 'react';
import PetOwnersAPI from '../components/PetOwnersAPI';
import { useSettings } from '../context/SettingsContext';

const Home = () => {
  const { t } = useSettings();

  return (
    <div className="page-content">
      <h2 className="page-title">{t('welcomeTitle')}</h2>
      <p className="welcome-text">
        {t('welcomeText')}
      </p>
      
      <div className="home-stats">
        <h3>{t('whyBestTitle')}</h3>
        <ul>
          <li>{t('whyBestItem1')}</li>
          <li>{t('whyBestItem2')}</li>
          <li>{t('whyBestItem3')}</li>
        </ul>
      </div>

      <hr className="section-divider" />
      <PetOwnersAPI />
    </div>
  );
};

export default Home;

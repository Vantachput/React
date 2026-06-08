import React from 'react';
import { useSettings } from '../context/SettingsContext';

const About = () => {
  const { t } = useSettings();

  return (
    <div className="page-content">
      <h2 className="page-title text-center">{t('aboutTitle')}</h2>
      
      <div className="about-content details-card" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto', display: 'block' }}>
        <p className="welcome-text text-center" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          {t('aboutIntro')}
        </p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
          {t('aboutHeader')}
        </h3>
        
        <ul style={{ lineHeight: '2', listStyleType: 'none', paddingLeft: 0, fontSize: '1.1rem' }}>
          <li>{t('aboutItem1')}</li>
          <li>{t('aboutItem2')}</li>
          <li>{t('aboutItem3')}</li>
          <li>{t('aboutItem4')}</li>
          <li>{t('aboutItem5')}</li>
        </ul>
        
        <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '2px dashed #edf2f7', paddingTop: '2rem' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{t('aboutVersion')}</p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {t('aboutFooter')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;


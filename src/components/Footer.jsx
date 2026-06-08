import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
  const { t } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>{t('footerRights', { year: currentYear })}</p>
      <p>{t('footerCreated')}</p>
    </footer>
  );
};

export default Footer;

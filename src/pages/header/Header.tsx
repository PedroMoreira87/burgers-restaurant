import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getRestaurant } from '../../apis/restaurant.ts';
import { a11yProps } from '../../utils/a11yProps.ts';
import Menu from '../menu/Menu.tsx';
import TabPanel from '../tab-panel/TabPanel.tsx';
import './Header.scss';

const Header = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);
  const [bannerImage, setBannerImage] = useState<string>('');

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await getRestaurant();
        setBannerImage(response.webSettings.bannerImage);
      } catch (error) {
        console.error('Failed to fetch banner image:', error);
      }
    };
    fetchBannerImage();
  }, []);

  const handleTabChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <header className="header-container">
        <section className="header-container__tabs" role="tablist" aria-label="basic tabs example">
          <button
            className={`header-container__tab ${value === 0 ? 'header-container__tab--active' : ''}`}
            role="tab"
            aria-selected={value === 0}
            onClick={() => handleTabChange(0)}
            {...a11yProps(0)}
          >
            <div className={'header-container__text'}>{t('menu')}</div>
          </button>
          <button
            className={`header-container__tab ${value === 1 ? 'header-container__tab--active' : ''}`}
            role="tab"
            aria-selected={value === 1}
            onClick={() => handleTabChange(1)}
            {...a11yProps(1)}
          >
            <div className={'header-container__text'}>{t('enter')}</div>
          </button>
          <button
            className={`header-container__tab ${value === 2 ? 'header-container__tab--active' : ''}`}
            role="tab"
            aria-selected={value === 2}
            onClick={() => handleTabChange(2)}
            {...a11yProps(2)}
          >
            <div className={'header-container__text'}>{t('contact')}</div>
          </button>
        </section>
        {bannerImage && <img className="header-container__img" src={bannerImage} alt="Burger Banner" />}
      </header>
      <div className="main-content">
        <TabPanel value={value} index={0}>
          <Menu />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {t('enter')}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {t('contact')}
        </TabPanel>
      </div>
    </>
  );
};

export default Header;

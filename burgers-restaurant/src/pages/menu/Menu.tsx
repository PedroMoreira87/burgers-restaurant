import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import search from '../../assets/icons/search.svg';
import desserts from '../../assets/images/desserts.svg';
import drinks from '../../assets/images/drinks.svg';
import { RootState } from '../../store';
import { a11yProps } from '../../utils/a11yProps.ts';
import MenuCategory from '../menu-category/MenuCategory.tsx';
import TabPanel from '../tab-panel/TabPanel.tsx';
import './Menu.scss';

const Menu = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);
  const menu = useSelector((state: RootState) => state.menu.data);

  const handleTabChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleSearchChange = () => {};

  return (
    <main className="menu">
      <section className="menu__search">
        <img className="menu__search-img" src={search} alt="Search" />
        <input className="menu__search-input" type="text" placeholder={t('search')} onChange={handleSearchChange} />
      </section>
      <section className="menu__card">
        <div className="menu__items-card">
          <div className="menu__tabs">
            <button
              className="menu__tab"
              role="tab"
              aria-selected={value === 0}
              onClick={() => handleTabChange(0)}
              {...a11yProps(0)}
            >
              <img
                className={`menu__tab-img ${value === 0 ? 'menu__tab-img--active' : ''}`}
                src={
                  menu?.sections.flatMap((section) => section.images).find((image) => image.id === 1550)?.image || ''
                }
                alt="Burger"
              />
              <div className={`menu__tab-text ${value === 0 ? 'menu__tab-text--active' : ''}`}>{t('burger')}</div>
              {value === 0 && <div className="menu__tab-line" />}
            </button>
            <button
              className="menu__tab"
              role="tab"
              aria-selected={value === 1}
              onClick={() => handleTabChange(1)}
              {...a11yProps(1)}
            >
              <img
                className={`menu__tab-img ${value === 1 ? 'menu__tab-img--active' : ''}`}
                src={drinks}
                alt="Drinks"
              />
              <div className={`menu__tab-text ${value === 1 ? 'menu__tab-text--active' : ''}`}>{t('drinks')}</div>
              {value === 1 && <div className="menu__tab-line" />}
            </button>
            <button
              className="menu__tab"
              role="tab"
              aria-selected={value === 2}
              onClick={() => handleTabChange(2)}
              {...a11yProps(2)}
            >
              <img
                className={`menu__tab-img ${value === 2 ? 'menu__tab-img--active' : ''}`}
                src={desserts}
                alt="Desserts"
              />
              <div className={`menu__tab-text ${value === 2 ? 'menu__tab-text--active' : ''}`}>{t('desserts')}</div>
              {value === 2 && <div className="menu__tab-line" />}
            </button>
          </div>
          <TabPanel value={value} index={0}>
            <MenuCategory category="burgers" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MenuCategory category="drinks" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MenuCategory category="desserts" />
          </TabPanel>
        </div>
      </section>
    </main>
  );
};

export default Menu;

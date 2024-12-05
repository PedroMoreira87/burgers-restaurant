import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';
import search from '../../assets/icons/search.svg';
import burger from '../../assets/images/burger.svg';
import dessert from '../../assets/images/dessert.svg';
import drink from '../../assets/images/drink.svg';
import { IModifierItem } from '../../interfaces/menu.interface.ts';
import { RootState } from '../../store';
import { cartActions } from '../../store/cart-slice.ts';
import './Menu.scss';
import { a11yProps } from '../../utils/a11yProps.ts';
import MenuCategory from '../menu-category/MenuCategory.tsx';
import TabPanel from '../tab-panel/TabPanel.tsx';

const Menu = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);
  // const menu = useSelector((state: RootState) => state.menu.data);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleTabChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleSearchChange = () => {};

  //TODO images from the api are not good
  // const categoryImage = (name: string) => {
  //   return menu?.sections.find((item) => item.name.toLowerCase() === name)?.images[0].image || '';
  // };

  const handleDecreaseQuantity = (id: string, modifiers: IModifierItem[]) => {
    dispatch(cartActions.removeItemFromCart({ id, modifiers }));
  };

  const handleIncreaseQuantity = (id: string, modifiers: IModifierItem[]) => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name: '',
        price: 0,
        quantity: 1,
        modifiers,
      }),
    );
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
  };

  return (
    <main className="menu">
      <section className="menu__search">
        <img className="menu__search-img" src={search} alt="Search" />
        <input className="menu__search-input" type="text" placeholder={t('search')} onChange={handleSearchChange} />
      </section>
      <section className="menu__main">
        <div className="menu__card">
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
                  src={burger}
                  alt="Burger"
                />
                <div className={`menu__tab-text ${value === 0 ? 'menu__tab-text--active' : ''}`}>{t('burgers')}</div>
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
                  src={drink}
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
                  src={dessert}
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
          <div className="menu__cart">
            <div className="menu__cart-title">{t('basket')}</div>
            <div className="menu__cart-items">
              {cart.items.map((item) => (
                <div key={item.id} className="menu__cart-item">
                  <div className="menu__item-price">
                    <div className="menu__item">
                      {item.name}
                      {item.modifiers?.map((mod) => (
                        <span key={mod.id} className="menu__item menu__item--modifier">
                          {mod.name}
                        </span>
                      ))}
                    </div>
                    <div className="menu__price">
                      {t('currency')}
                      {item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="menu__counter">
                    <button className="menu__button" onClick={() => handleDecreaseQuantity(item.id, item.modifiers)}>
                      <img src={minus} alt="Minus" />
                    </button>
                    <span className="menu__counter-number">{item.quantity}</span>
                    <button className="menu__button" onClick={() => handleIncreaseQuantity(item.id, item.modifiers)}>
                      <img src={plus} alt="Plus" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="menu__cart-subtotal-price">
              <div className="menu__item">{t('subtotal')}</div>
              <div className="menu__price">
                {t('currency')}
                {calculateSubtotal()}
              </div>
            </div>
            <div className="menu__cart-total-price">
              <div className="menu__item menu__item--total">{t('total')}:</div>
              <div className="menu__price menu__price--total">
                {t('currency')}
                {calculateSubtotal()}
              </div>
            </div>
            <div className="menu__footer">
              <button className="menu__checkout">
                <p>{t('checkout-now')}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="menu__footer menu__footer--basket">
          <button className="menu__checkout">
            <p>{t('your-basket')}</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Menu;

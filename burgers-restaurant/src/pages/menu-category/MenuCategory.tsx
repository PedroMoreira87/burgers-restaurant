import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './MenuCategory.scss';
import chevronUp from '../../assets/icons/chevronUp.svg';
import noImage from '../../assets/images/no-image.svg';
import { RootState } from '../../store';

interface MenuCategoryProps {
  category: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category }) => {
  const { t } = useTranslation();
  const menu = useSelector((state: RootState) => state.menu.data);
  const categorySection = menu?.sections.find((section) => section.name.toLowerCase() === category);

  return (
    <main className="category">
      <section>
        <button className="category__title">
          <div className="category__title-text">{t(`${category}`)}</div>
          <img src={chevronUp} alt="Chevron Up" />
        </button>
      </section>
      <section className="category__data">
        {categorySection?.items.map((item) => (
          <div className="category__item" key={item.id}>
            <div className="category__data-text">
              <div className="category__name">{item.name}</div>
              <div className="category__description">{item.description}</div>
              <div className="category__price">{`${t('currency')}${item.price.toFixed(2)}`}</div>
            </div>
            <img className="category__image" src={item.images?.[0]?.image || noImage} alt={item.name} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default MenuCategory;

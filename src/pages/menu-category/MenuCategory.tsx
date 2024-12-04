import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './MenuCategory.scss';
import chevronDown from '../../assets/icons/chevron-down.svg';
import chevronUp from '../../assets/icons/chevron-up.svg';
import noImage from '../../assets/images/no-image.svg';
import { IItem } from '../../interfaces/menu.interface.ts';
import { RootState } from '../../store';
import Modal from '../modal/Modal.tsx';

interface MenuCategoryProps {
  category: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category }) => {
  const { t } = useTranslation();
  const menu = useSelector((state: RootState) => state.menu.data);
  const categorySection = menu?.sections.find((section) => section.name.toLowerCase() === category);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = (item: IItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <main className="category">
      <section>
        <button className="category__title" onClick={toggleMenu}>
          <div className="category__title-text">{t(`${category}`)}</div>
          <img src={isOpen ? chevronUp : chevronDown} alt="Chevron" />
        </button>
      </section>
      {isOpen && (
        <section className="category__data">
          {categorySection?.items.map((item) => (
            <button className="category__item" key={item.id} onClick={() => openModal(item)}>
              <div className="category__data-text">
                <div className="category__name">{item.name}</div>
                <div className="category__description">{item.description}</div>
                <div className="category__price">{`${t('currency')}${item.price.toFixed(2)}`}</div>
              </div>
              <img className="category__img" src={item.images?.[0]?.image || noImage} alt={item.name} />
            </button>
          ))}
        </section>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal} selectedItem={selectedItem} />
    </main>
  );
};

export default MenuCategory;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './MenuCategory.scss';
import chevronDown from '../../assets/icons/chevron-down.svg';
import chevronUp from '../../assets/icons/chevron-up.svg';
import noImage from '../../assets/images/no-image.svg';
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
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = (item: any) => {
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
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedItem && (
          <div className="modal__details">
            <img src={selectedItem.images?.[0]?.image || noImage} alt={selectedItem.name} />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <p>
              {t('currency')}
              {selectedItem.price.toFixed(2)}
            </p>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default MenuCategory;

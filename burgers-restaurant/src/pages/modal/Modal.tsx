import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Modal.scss';

import { useDispatch } from 'react-redux';

import close from '../../assets/icons/close.svg';
import { cartActions } from '../../store/cart-slice.ts';

interface Modifier {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

interface ModifierGroup {
  id: number;
  name: string;
  items: Modifier[];
  minChoices: string;
  maxChoices: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: { id: number; image: string }[];
  modifiers?: ModifierGroup[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedItem }) => {
  const { t } = useTranslation();
  const [selectedModifiers, setSelectedModifiers] = useState<{ [key: number]: Modifier | null }>({});
  const dispatch = useDispatch();

  if (!isOpen || !selectedItem) return null;

  const handleModifierChange = (modifierId: number, selectedOption: Modifier) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [modifierId]: selectedOption,
    }));
  };

  const handleAddToBasket = () => {
    const selectedModifiersArray = Object.values(selectedModifiers).filter(Boolean) as Modifier[];
    const totalPrice = selectedModifiersArray.reduce((total, mod) => total + mod.price, selectedItem.price);
    dispatch(
      cartActions.addItemToCart({
        id: selectedItem.id,
        name: selectedItem.name,
        price: totalPrice,
        modifiers: selectedModifiersArray,
      }),
    );
    console.log(selectedItem);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <img src={selectedItem.images?.[0]?.image} alt={selectedItem.name} />
        <div className="modal__title">
          <h2>{selectedItem.name}</h2>
          <p>{selectedItem.description}</p>
        </div>
        {!selectedItem.modifiers && (
          <div className="modal__subtitle">
            <p>{`${t('price')}: ${t('currency')}${selectedItem.price.toFixed(2)}`}</p>
          </div>
        )}
        {selectedItem.modifiers?.map((modifier: ModifierGroup) => (
          <div key={modifier.id}>
            <div className="modal__subtitle">
              <p>{modifier.name}</p>
              <p>
                {`${t('select')} ${modifier.maxChoices}`}
                {modifier.maxChoices === 1 ? ` ${t('option')}` : ` ${t('options')}`}
              </p>
            </div>
            {modifier.items.map((option: Modifier) => (
              <label key={option.id} className="modal__modifier-option">
                <div className="modal__modifier-option-text">
                  <p>{option.name}</p>
                  <p> {`${t('currency')}${option.price.toFixed(2)}`}</p>
                </div>
                <input
                  className="modal__radio-input"
                  type="radio"
                  name={`modifier-${modifier.id}`}
                  value={option.id}
                  onChange={() => handleModifierChange(modifier.id, option)}
                  disabled={!option.available}
                />
              </label>
            ))}
          </div>
        ))}
        <button className="modal__add-to-basket" onClick={handleAddToBasket}>
          {t('add-to-order')}
        </button>
      </div>
    </div>
  );
};

export default Modal;

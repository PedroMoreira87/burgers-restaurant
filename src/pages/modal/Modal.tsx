import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import close from '../../assets/icons/close.svg';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';
import noImage from '../../assets/images/no-image.svg';
import './Modal.scss';
import { IItem, IModifier, IModifierItem } from '../../interfaces/menu.interface.ts';
import { cartActions } from '../../store/cart-slice.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: IItem | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedItem }) => {
  const { t } = useTranslation();
  const [selectedModifiers, setSelectedModifiers] = useState<{ [key: number]: IModifierItem | null }>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      setIsFooterVisible(false);
      setQuantity(1);
      setSelectedModifiers({});
    }
  }, [isOpen]);

  if (!isOpen || !selectedItem) return null;

  const handleModifierChange = (modifierId: number, selectedOption: IModifierItem) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [modifierId]: selectedOption,
    }));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handleOpenFooter = () => {
    setIsFooterVisible(true);
  };

  const handleCloseFooter = () => {
    setIsFooterVisible(false);
  };

  const selectedModifiersArray = Object.values(selectedModifiers).filter(Boolean) as IModifierItem[];
  const sumOfModifiers = selectedModifiersArray.reduce((total, mod) => total + mod.price, 0);
  const perUnitPrice = selectedItem.price + sumOfModifiers;
  const totalPrice = perUnitPrice * quantity;

  const handleAddToBasket = () => {
    dispatch(
      cartActions.addItemToCart({
        id: selectedItem.id,
        name: selectedItem.name,
        price: perUnitPrice,
        quantity,
        modifiers: selectedModifiersArray,
      }),
    );
    handleCloseFooter();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content" onClick={handleOpenFooter}>
        <button className="modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <div className="modal__body">
          <img src={selectedItem.images?.[0]?.image || noImage} alt={selectedItem.name} />
          <div className="modal__title">
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
          </div>
          {!selectedItem.modifiers && (
            <div className="modal__subtitle">
              <p>{`${t('price')}: ${t('currency')}${selectedItem.price.toFixed(2)}`}</p>
            </div>
          )}
          {selectedItem.modifiers?.map((modifier: IModifier) => (
            <div key={modifier.id}>
              <div className="modal__subtitle">
                <p>{modifier.name}</p>
                <p>
                  {`${t('select')} ${modifier.maxChoices}`}
                  {modifier.maxChoices === 1 ? ` ${t('option')}` : ` ${t('options')}`}
                </p>
              </div>
              {modifier.items.map((option: IModifierItem) => (
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
        </div>
        {isFooterVisible && (
          <div className="modal__footer">
            <div className="modal__quantity-control">
              <button className="modal__button" onClick={handleDecreaseQuantity}>
                <img src={minus} alt="Minus" />
              </button>
              <span className="modal__quantity-number">{quantity}</span>
              <button className="modal__button" onClick={handleIncreaseQuantity}>
                <img src={plus} alt="Plus" />
              </button>
            </div>
            <button className="modal__add-to-order" onClick={handleAddToBasket}>
              <p>
                {t('add-to-order')} • {t('currency')}
                {totalPrice.toFixed(2)}
              </p>
            </button>
          </div>
        )}
        {!selectedItem.modifiers && (
          <div className="modal__footer">
            <button className="modal__add-to-order" onClick={handleAddToBasket}>
              <p>
                {t('add-to-order')} • {t('currency')}
                {totalPrice.toFixed(2)}
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

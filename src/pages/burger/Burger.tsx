import { useTranslation } from 'react-i18next';

import './Burger.scss';

const Burger = () => {
  const { t } = useTranslation();

  return <main>{t('burger')}</main>;
};

export default Burger;

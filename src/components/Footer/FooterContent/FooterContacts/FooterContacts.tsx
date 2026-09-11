import React from 'react';
import cls from './FooterContacts.module.scss';
import { ContactBlock } from '../ContactBlock/ContactBlock';
import { companyContactsConstant } from '../../../../constants/contacts';

export const FooterContacts: React.FC = () => {
  return (
    <div className={cls.contacts}>
      <ContactBlock
        label="Контакты"
        contents={[
          companyContactsConstant.formattedPhone,
          companyContactsConstant.email,
        ]}
      />
      <ContactBlock label="Адрес" contents={[companyContactsConstant.address]} />
      <ContactBlock
        label="Режим работы"
        contents={[...companyContactsConstant.workingHours]}
      />
    </div>
  );
};

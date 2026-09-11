import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { ContactBlock } from '@/components/Footer/FooterContent/ContactBlock/ContactBlock';
import { companyContactsConstant } from '@/constants/contacts';
import cls from './AboutContacts.module.scss';

export const AboutContacts: React.FC = () => {
  return (
    <ContentContainer className={cls.container}>
      <h2 className={cls.title}>Как нас найти</h2>
      <div className={cls.blocks}>
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
    </ContentContainer>
  );
};

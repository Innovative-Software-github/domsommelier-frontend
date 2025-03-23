import cls from './ContactBlock.module.scss';

export interface IContactBlock {
  label: string;
  contents: string[];
}

export const ContactBlock: React.FC<IContactBlock> = ({ label, contents }) => (
  <div className={cls.contactsBlock}>
    <div className={cls.contactLabel}>{label}</div>
    {contents.map((content, index) => (
      <div key={index} className={cls.contactContent}>
        {content}
      </div>
    ))}
  </div>
);

import * as React from 'react';
import cls from './MobileMenuAccordion.module.scss';
import { Accordion } from '../../../../../ui/Accordion/Accordion';
import Link from 'next/link';

export interface IMobileMenuAccordionOption {
  name: string;
  href: string;
}

export interface IMobileMenuAccordionProps {
  option: IMobileMenuAccordionOption[];
  title: string;
}

export const MobileMenuAccordion: React.FC<IMobileMenuAccordionProps> = ({
  option,
  title,
}) => {
  return (
    <Accordion className={cls.accordion} bodyClassName={cls.body} title={title}>
      {option.map(({ name, href }) => (
        <Link className={cls.link} href={href}>
          {name}
        </Link>
      ))}
    </Accordion>
  );
};

import React from 'react';
import Link from 'next/link';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import styles from './AboutSection.module.scss';

const mainTextContent =
  'Дом Сомелье – концептуальное место для поклонников вина, его тайн и неизведанных граней вкуса.';

const subTextContent =
  'Мы ищем для Покупателя вкусные вина с особым характером из разных географических зон. В Доме Сомелье весь ассортимент подобран нами с любовью и ответственностью перед Покупателем.';

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <ContentContainer className={styles.container}>
        <h2 className={styles.sectionTitle}>О нас</h2>
        <div className={styles.contentBlock}>
          <p className={styles.mainText}>{mainTextContent}</p>
          <div className={styles.description}>
            {subTextContent}
            <Link href="/" className={styles.link}>
              Узнать больше о нас
            </Link>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

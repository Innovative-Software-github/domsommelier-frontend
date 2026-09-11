import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import cls from './AboutHero.module.scss';

const mainStatement =
  'Дом Сомелье – концептуальное место для поклонников вина, его тайн и неизведанных граней вкуса.';

const paragraphs = [
  'Мы ищем для Покупателя вкусные вина с особым характером из разных географических зон. В Доме Сомелье весь ассортимент подобран нами с любовью и ответственностью перед Покупателем.',
  'В каталоге — вино, игристое и шампанское, крепкий алкоголь, закуски и аксессуары. Помогаем с подбором под повод и стол, а для тех, кто хочет разобраться глубже, регулярно проводим дегустации и винные казино.',
  'Заглядывайте в нашу винотеку в Перми, заказывайте с доставкой или забирайте самовывозом — как удобнее.',
];

export const AboutHero: React.FC = () => {
  return (
    <ContentContainer className={cls.container}>
      <span className={cls.label}>О нас</span>
      <h1 className={cls.statement}>{mainStatement}</h1>
      <div className={cls.paragraphs}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </ContentContainer>
  );
};

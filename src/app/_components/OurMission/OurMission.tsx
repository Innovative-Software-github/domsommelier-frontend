import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import cls from './OurMission.module.scss';

export const OurMission: React.FC = () => {
  const missionText =
    'Мы верим, что хорошее  вино – это маленькая  роскошь,  которую  может себе позволить каждый';

  return (
    <aside className={cls.wrapper}>
      <ContentContainer className={cls.contentContainer}>
        <div className={cls.title}>Наша миссия</div>
        <p className={cls.missionText}>{missionText}</p>
      </ContentContainer>
    </aside>
  );
};

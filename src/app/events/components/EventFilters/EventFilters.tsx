import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import styles from './EventFilters.module.scss';

export interface IEventFiltersProps {} 

export const EventFilters: React.FC<IEventFiltersProps> = () => {
  return (
    <ContentContainer className={styles.container}>
      <div className={styles.filter}>
        Формат
      </div>
      <div className={styles.filter}>
        Стоимость
      </div>
    </ContentContainer>
  );
};
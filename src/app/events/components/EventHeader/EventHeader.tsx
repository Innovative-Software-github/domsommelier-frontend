import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import styles from './EventHeader.module.scss';

export const EventHeader: React.FC = () => {
  return (
    <ContentContainer>
      <h1 className={styles.title}>Дегустации</h1>
    </ContentContainer>
  );
};
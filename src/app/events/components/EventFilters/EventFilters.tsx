import { EventNameByType } from '../../../../constants/events';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { Select } from '../../../../ui/Select/Select';
import { IFilters } from '../EventsClient/EventsClient';
import styles from './EventFilters.module.scss';
import { getEventFilterOptions } from './utils';

export interface IEventFiltersProps {
  eventType: IFilters['type'];
  updateFilters: (format: IFilters['type']) => void;
} 

export const EventFilters: React.FC<IEventFiltersProps> = ({
  eventType,
  updateFilters,
}) => {
  const formatSelectOptions = getEventFilterOptions();
 
  return (
    <ContentContainer className={styles.container}>
      <Select
        anchor="Формат"
        options={formatSelectOptions}
        onSelect={(option) => updateFilters(option.key as IFilters['type'])}
        selectedOption={eventType ? { key: eventType, value: EventNameByType[eventType] } : undefined}
      />
    </ContentContainer>
  );
};
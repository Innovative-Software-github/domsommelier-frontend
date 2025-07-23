import { IEvent } from '../../../../../services/events/interfaces';
import { ContentContainer } from '../../../../../ui/ContentContainer/ContentContainer';
import cls from './EventByIdHeader.module.scss';

export interface IEventByIdHeaderProps {
  event: IEvent;
}

export const EventByIdHeader: React.FC<IEventByIdHeaderProps> = ({ event }) => {
  return (
    <div className={cls.wrapper}>
      <ContentContainer>
        <div className={cls.title}>{event.title}</div>
      </ContentContainer>
    </div>
  );
};
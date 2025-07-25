import { EventTypes, TEventTypes } from "../../../../services/events/interfaces";
import clsx from "clsx";
import cls from './EventTypeTag.module.scss';

export interface IEventTypeTagProps {
  type: TEventTypes;
  className?: string;
}

export const EventNameByType: Record<TEventTypes, string> = {
  [EventTypes.degustation]: 'Дегустация',
  [EventTypes.wineCasino]: 'Винное казино',
}

export const EventTypeTag: React.FC<IEventTypeTagProps> = ({ type, className }) => {
  return <div className={clsx(cls.tag, className)}>{EventNameByType[type] || 'Мероприятие'}</div>;
};
import clsx from "clsx";
import cls from './EventTypeTag.module.scss';
import { EventNameByType, TEventTypes } from "../../../../constants/events";

export interface IEventTypeTagProps {
  type: TEventTypes;
  className?: string;
}

export const EventTypeTag: React.FC<IEventTypeTagProps> = ({ type, className }) => {
  return <div className={clsx(cls.tag, className)}>{EventNameByType[type] || 'Мероприятие'}</div>;
};
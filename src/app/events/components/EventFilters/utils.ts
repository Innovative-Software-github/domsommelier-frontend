import { EventNameByType, EventTypes } from "../../../../constants/events";
import { ISelectOptions } from "../../../../ui/Select/Select";

export const getEventFilterOptions = (): ISelectOptions[] => {
  return Object.values(EventTypes).map((value) => ({
    key: value,
    value: EventNameByType[value],
  }));
};
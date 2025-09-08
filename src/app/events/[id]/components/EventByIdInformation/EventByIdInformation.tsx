import { TEventTypes } from "../../../../../constants/events";
import { Accordion } from "../../../../../ui/Accordion/Accordion";
import { ContentContainer } from "../../../../../ui/ContentContainer/ContentContainer";
import { EVENT_INFORMATION } from "../../constants/eventInformation";
import { SplitContainer } from "../../ui/SplitContainer/SplitContainer";
import cls from './EventByIdInformation.module.scss';

export interface IEventByIdInformationProps {
  eventType: TEventTypes;
}

export const EventByIdInformation: React.FC<IEventByIdInformationProps> = ({
  eventType
}) => {
  const eventInformation = EVENT_INFORMATION[eventType];

  if (!eventInformation) {
    return <>Произошла ошибка, обратититесь в тех поддержку</>
  }

  return (
    <ContentContainer className={cls.container}>
      <SplitContainer title={eventInformation.about.title}>
        {eventInformation.about.description}
      </SplitContainer>
      <SplitContainer title={eventInformation.howItGoes.title}>
        {eventInformation.howItGoes.description}
      </SplitContainer>
      <SplitContainer title={eventInformation.faq.title}>
        {eventInformation.faq.content.map((faqItem) => (
          <Accordion
            className={cls.accrodion}
            titleClassName={cls.titleAccordion}
            bodyClassName={cls.bodyAccordion}
            title={faqItem.title}
          >
            {faqItem.description}
          </Accordion>
        ))}
      </SplitContainer>
    </ContentContainer>
  );
}
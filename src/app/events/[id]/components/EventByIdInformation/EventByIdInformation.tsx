import { IEvent } from "../../../../../services/events/interfaces";
import { Accordion } from "../../../../../ui/Accordion/Accordion";
import { ContentContainer } from "../../../../../ui/ContentContainer/ContentContainer";
import { SplitContainer } from "../../ui/SplitContainer/SplitContainer";
import cls from './EventByIdInformation.module.scss';

export interface IEventByIdInformationProps {
  event: IEvent;
}

export const EventByIdInformation: React.FC<IEventByIdInformationProps> = ({
  event
}) => {
  const about = event.about?.trim();
  const howItGoes = event.howItGoes?.trim();
  const faq = (event.faq ?? []).filter(
    (item) => Boolean(item.question?.trim()) && Boolean(item.answer?.trim())
  );

  // Ничего не заполнено в админке для этого мероприятия — блок не рендерим,
  // а не показываем пустые заголовки.
  if (!about && !howItGoes && faq.length === 0) {
    return null;
  }

  return (
    <ContentContainer className={cls.container}>
      {about && (
        <SplitContainer title="О мероприятии">
          {about}
        </SplitContainer>
      )}
      {howItGoes && (
        <SplitContainer title="Как проходит">
          {howItGoes}
        </SplitContainer>
      )}
      {faq.length > 0 && (
        <SplitContainer title="FAQ">
          {faq.map((faqItem, index) => (
            <Accordion
              key={index}
              className={cls.accrodion}
              titleClassName={cls.titleAccordion}
              bodyClassName={cls.bodyAccordion}
              title={faqItem.question}
            >
              {faqItem.answer}
            </Accordion>
          ))}
        </SplitContainer>
      )}
    </ContentContainer>
  );
}

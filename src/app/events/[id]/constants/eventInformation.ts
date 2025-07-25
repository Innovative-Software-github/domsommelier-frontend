import { TEventTypes } from "../../../../services/events/interfaces";

export interface IFaqItem {
  title: string;
  description: string;
}

export interface IFaq {
  title: string;
  content: IFaqItem[];
};

export interface IEventInfo {
  about: {
    title: string;
    description: string;
  };
  howItGoes: {
    title: string;
    description: string;
  };
  faq: IFaq;
};

export const EVENT_INFORMATION: Record<TEventTypes, IEventInfo> = {
  degustation: {
    about: {
      title: 'о Дегустации',
      description: 'Винная дегустация — это увлекательный процесс, который позволяет не только насладиться разнообразием вин, но и углубить свои знания о культуре виноделия. Обычно дегустация проходит в специально подготовленных помещениях, где создается атмосфера, способствующая сосредоточению на нюансах вкуса и аромата. \n\nНа дегустации участники имеют возможность попробовать несколько сортов вина, которые могут быть выбраны по различным критериям: региону производства, сорту винограда или стилю. Перед началом дегустации важно подготовить все необходимые инструменты: бокалы, декантеры и закуски, которые помогут подчеркнуть вкусовые качества вин.',
    },
    howItGoes: {
      title: 'Как проходит дегустация?',
      description: 'Винная дегустация — это увлекательный процесс, который позволяет не только насладиться разнообразием вин, но и углубить свои знания о культуре виноделия. Обычно дегустация проходит в специально подготовленных помещениях, где создается атмосфера, способствующая сосредоточению на нюансах вкуса и аромата. \n\nНа дегустации участники имеют возможность попробовать несколько сортов вина, которые могут быть выбраны по различным критериям: региону производства, сорту винограда или стилю. Перед началом дегустации важно подготовить все необходимые инструменты: бокалы, декантеры и закуски, которые помогут подчеркнуть вкусовые качества вин.',
    },
    faq: {
      title: 'FAQ',
      content: [
        {
          title: 'I don’t really understand, what service do you offer?',
          description: 'We offer ready-made furniture packages with free delivery, set up and apartment cleaning guided by your personal manager. The packages are made in 6 different styles: Modern, Cream, Scandinavian, Golden Rose, Boho and Marble.',
        },
        {
          title: 'I don’t really understand, what service do you offer?',
          description: 'We offer ready-made furniture packages with free delivery, set up and apartment cleaning guided by your personal manager. The packages are made in 6 different styles: Modern, Cream, Scandinavian, Golden Rose, Boho and Marble.',
        },
        {
          title: 'I don’t really understand, what service do you offer?',
          description: 'We offer ready-made furniture packages with free delivery, set up and apartment cleaning guided by your personal manager. The packages are made in 6 different styles: Modern, Cream, Scandinavian, Golden Rose, Boho and Marble.',
        }
      ]
    }
  },
  wineCasino: {
    about: { title: '', description: '' },
    howItGoes: { title: '', description: '' },
    faq: {
      title: '',
      content: [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
      ]
    }
  },
};
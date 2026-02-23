import { HovercardProps } from '@ariakit/react';
import { PopoverAnchor } from './PopoverAnchor/PopoverAnchor';
import { PopoverContent } from './PopoverContent/PopoverContent';

export type TPopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface IPopoverComposition {
  Anchor: typeof PopoverAnchor;
  Content: typeof PopoverContent;
}

export type TPopoverChild =
  | React.ReactElement<React.ComponentProps<typeof PopoverAnchor>>
  | React.ReactElement<React.ComponentProps<typeof PopoverContent>>;

export interface IPopoverProps {
  children: (TPopoverChild | false | null | undefined)[] | TPopoverChild;
  placement?: TPopoverPlacement;
  showTimeout?: number;
  hideTimeout?: number;
}

export interface IPopoverAnchorProps extends React.PropsWithChildren {
  className?: string;
}

export interface IPopoverContentProps extends Omit<HovercardProps, 'store'> {
  showArrow?: boolean;
}


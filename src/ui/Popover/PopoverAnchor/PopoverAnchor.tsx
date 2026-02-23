import { HovercardAnchor } from '@ariakit/react';
import { IPopoverAnchorProps } from '../interfaces';

export const PopoverAnchor: React.FC<IPopoverAnchorProps> = ({
  className,
  children,
}) => {
  return (
    <HovercardAnchor className={className}>
      {children}
    </HovercardAnchor>
  );
};


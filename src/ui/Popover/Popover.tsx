import React from 'react';
import { HovercardProvider } from '@ariakit/react';

import { PopoverAnchor } from './PopoverAnchor/PopoverAnchor';
import { PopoverContent } from './PopoverContent/PopoverContent';
import { IPopoverComposition, IPopoverProps } from './interfaces';

export const Popover: React.FC<IPopoverProps> & IPopoverComposition = ({
  children,
  placement = 'bottom',
  showTimeout = 150,
  hideTimeout = 300,
}) => {
  return (
    <HovercardProvider
      placement={placement}
      showTimeout={showTimeout}
      hideTimeout={hideTimeout}
    >
      {children}
    </HovercardProvider>
  );
};

Popover.Anchor = PopoverAnchor;
Popover.Content = PopoverContent;


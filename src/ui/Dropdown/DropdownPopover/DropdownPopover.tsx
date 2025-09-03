import { Popover } from "@ariakit/react";
import { IDropdownPopoverProps } from "../interfaces";

export const DropdownPopover: React.FC<IDropdownPopoverProps> = ({ 
  children,
  ...props
}) => {
  return (
    <Popover
      {...props}
    >
      {children}
    </Popover>
  );
};
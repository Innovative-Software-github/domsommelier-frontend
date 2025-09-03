import { PopoverDisclosure } from "@ariakit/react";
import { IDropdownAnchorProps } from "../interfaces";

export const DropdownAnchor: React.FC<IDropdownAnchorProps> = ({
  className,
  children
}) => {
  return (
    <PopoverDisclosure className={className}>
      {children}
    </PopoverDisclosure>
  );
};
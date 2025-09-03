import React from "react";
import { PopoverProvider } from "@ariakit/react";
import { DropdownAnchor } from "./DropdownAnchor/DropdownAnchor";
import { DropdownPopover } from "./DropdownPopover/DropdownPopover";
import { IDropdownComposition, IDropdownProps } from './interfaces';
import { validateChildren } from "./utils";

export const Dropdown: React.FC<IDropdownProps> & IDropdownComposition = ({
  children,
}) => {
  if (!validateChildren(children)) {
    console.error('Dropdown: Разрешены только Dropdown.Anchor и Dropdown.Popover как дочерние элементы');

    return null;
  }

  return (
    <PopoverProvider
      placement="bottom-start"
    >
      {children}
    </PopoverProvider>
  );
};

Dropdown.Anchor = DropdownAnchor;
Dropdown.Popover = DropdownPopover;

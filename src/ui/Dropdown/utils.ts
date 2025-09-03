import React from 'react';
import { DropdownAnchor } from "./DropdownAnchor/DropdownAnchor";
import { DropdownPopover } from "./DropdownPopover/DropdownPopover";

export const validateChildren = (children: React.ReactNode) => {
  if (!children) return true;
  
  const childrenArray = React.Children.toArray(children);
  
  return childrenArray.every(child => {
    if (!React.isValidElement(child)) return false;
    
    return child.type === DropdownAnchor || child.type === DropdownPopover;
  });
};
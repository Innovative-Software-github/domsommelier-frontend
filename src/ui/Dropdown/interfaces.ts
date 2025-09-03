import { PopoverProps } from "@ariakit/react/popover";
import { DropdownAnchor } from "./DropdownAnchor/DropdownAnchor";
import { DropdownPopover } from "./DropdownPopover/DropdownPopover";

export interface IDropdownComposition {
  Anchor: typeof DropdownAnchor;
  Popover: typeof DropdownPopover;
}

export type TDropdownChild = 
  | React.ReactElement<React.ComponentProps<typeof DropdownAnchor>>
  | React.ReactElement<React.ComponentProps<typeof DropdownPopover>>;

export interface IDropdownProps {
  children: TDropdownChild | TDropdownChild[];
}

export interface IDropdownAnchorProps extends React.PropsWithChildren {
  className?: string;
}

export interface IDropdownPopoverProps extends PopoverProps {}
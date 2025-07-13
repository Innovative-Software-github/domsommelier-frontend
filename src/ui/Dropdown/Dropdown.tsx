import { Popover, PopoverDisclosure, PopoverProvider } from "@ariakit/react";
import styles from './Dropdown.module.scss';

export interface IDropdownProps {
  anchor: React.ReactNode;
  children: React.ReactNode;
  flip?: boolean;
}

export const Dropdown: React.FC<IDropdownProps> = ({ anchor, children, flip = false }) => {
  return (
    <PopoverProvider>
      <PopoverDisclosure className={styles.disclosure}>
        {anchor}
      </PopoverDisclosure>
      <Popover
        className={styles.popover}
        flip={flip}
      >
        {children}
      </Popover>
    </PopoverProvider>
  );
}; 
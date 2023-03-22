import React, { CSSProperties, FC, JSXElementConstructor } from 'react';
import CSSVariablesType from '../../types/CSSVariablesType';
import styles from './Navbar.module.css';

interface NavbarElementProps {
  name: string;
  Icon: FC;
  callback?: () => void;
}
const NavbarElement: FC<NavbarElementProps> = ({ name, Icon, callback }) => {
  return (
    <button onClick={callback} className={styles['navbar--button']}>
      <Icon />
      <span>{name}</span>
    </button>
  );
};

interface NavbarProps {
  elements: NavbarElementProps[];
}
const Navbar: FC<NavbarProps> = ({ elements }) => {
  return (
    <nav
      className={styles.navbar}
      style={{ '--length': elements.length } as CSSVariablesType}
    >
      {elements.map((element, index) => (
        <NavbarElement {...element} key={index} />
      ))}
    </nav>
  );
};

export { Navbar, NavbarElement };

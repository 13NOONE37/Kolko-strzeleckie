import React, { CSSProperties, FC, JSXElementConstructor } from 'react';
import CSSVariablesType from '../../types/CSSVariablesType';
import style from './Navbar.module.css';

interface NavbarElementProps {
  name: string;
  Icon: FC;
  callback?: () => void;
}
const NavbarElement: FC<NavbarElementProps> = ({ name, Icon, callback }) => {
  return (
    <button onClick={callback} className={style['navbar--button']}>
      <Icon />
      <span>{name}</span>
    </button>
  );
};

interface NavbarProps {
  elements: NavbarElementProps[];
  CTA?: {
    name: string;
    Icon: FC;
    callback?: () => void;
  };
}
const Navbar: FC<NavbarProps> = ({ elements, CTA }) => {
  return (
    <nav
      className={style.navbar}
      style={{ '--length': elements.length } as CSSVariablesType}
    >
      {CTA && (
        <button
          className={style['navbar--CTA']}
          name={CTA.name}
          onClick={CTA.callback}
        >
          {<CTA.Icon />}
        </button>
      )}

      {elements.map((element, index) => (
        <NavbarElement {...element} key={index} />
      ))}
    </nav>
  );
};

export { Navbar, NavbarElement };

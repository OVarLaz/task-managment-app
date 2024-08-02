import { useState } from 'react';
import { Group } from '@mantine/core';
import logo from '../../assets/images/logo.png';
import { GroupIcon, ListIcon } from '../ui/Icon';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'DASHBOARD', icon: <GroupIcon /> },
  { link: '', label: 'MY TASKS', icon: <ListIcon /> },
];

function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      {item.icon}
      <span className={classes.itemLabel}>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <img className="pl-8" src={logo} alt="Logo" width={30} />
          <div />
        </Group>
        {links}
      </div>
    </nav>
  );
}

export default Navbar;

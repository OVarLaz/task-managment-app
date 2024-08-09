import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';

import logo from '../../assets/images/logo.png';
import { GroupIcon, ListIcon } from '../ui/Icon';
import classes from './Navbar.module.css';

const data = [
  { link: '/', label: 'DASHBOARD', icon: <GroupIcon /> },
  { link: '/my-tasks', label: 'MY TASKS', icon: <ListIcon /> },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  const handleClick = (link: string) => {
    setActive(link);
    navigate(link);
  };

  const links = data.map((item) => {
    const isActive = item.link === active;
    const iconColor = isActive ? '#DA584B' : 'white';
    return (
      <a
        className={classes.link}
        data-active={item.link === active || undefined}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          handleClick(item.link);
        }}
      >
        {React.cloneElement(item.icon, { color: iconColor })}
        <span className={classes.itemLabel}>{item.label}</span>
      </a>
    );
  });

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

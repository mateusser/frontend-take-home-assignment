import React from 'react';

import OriginLogo from '~/assets/icons/logo.svg';

import './Header.scss';

const Header = (): JSX.Element => (
  <header className="Header">
    <OriginLogo className="Header__logo" alt="Origin" />
  </header>
);

export default Header;

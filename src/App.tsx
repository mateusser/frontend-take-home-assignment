import * as React from 'react';
import { Header, SavingGoal } from './components';
import HouseIcon from '~/assets/icons/house.svg';

import '~/styles/global.scss';
import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <p className="App__paragraph">
        Let&apos;s plan your{' '}
        <span className="App__paragraph--bold">saving goal.</span>
      </p>
      <SavingGoal icon={HouseIcon} name="Buy a house" />
    </>
  );
};

export default App;

import { useState } from 'react';

import Home from './pages/Home';

import './scss/globals.scss';

const App = () => {
  const [isRequstSuccess, setRequstSuccess] = useState(false);
  const [isRequstSended, setRequstSended] = useState(false);

  return (
    <div className={'app'}>
      <Home
        isRequstSuccess={isRequstSuccess}
        setRequstSuccess={setRequstSuccess}
        isRequstSended={isRequstSended}
        setRequstSended={setRequstSended}
      />
    </div>
  );
};

export default App;

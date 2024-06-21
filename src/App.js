import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/routes';
import { checkAndCreateTables } from './db/db';
import { AdProvider } from './context/ADContext';

const AppInit = () => {
  React.useEffect(() => {
    checkAndCreateTables()
  }, [])

  return (

    <AdProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AdProvider>
  );
};

export default AppInit;

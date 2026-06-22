import React, {useCallback, useState} from 'react';

import {AppProviders} from './src/app';
import {VehicleExplorerScreen, WelcomeScreen} from './src/presentation/screens';
import {LanguageToggleOverlay} from './src/presentation/ui';

type AppScreen = 'welcome' | 'explorer';

function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');

  const handleExplore = useCallback(() => {
    setScreen('explorer');
  }, []);

  return (
    <AppProviders>
      <LanguageToggleOverlay />
      {screen === 'welcome' ? (
        <WelcomeScreen onExplore={handleExplore} />
      ) : (
        <VehicleExplorerScreen />
      )}
    </AppProviders>
  );
}

export default App;

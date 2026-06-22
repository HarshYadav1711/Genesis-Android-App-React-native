import React, {useCallback, useState} from 'react';

import {AppProviders} from './src/app';
import type {Vehicle} from './src/domain/vehicle';
import {
  SpecBoardScreen,
  VehicleExplorerScreen,
  WelcomeScreen,
} from './src/presentation/screens';
import {LanguageToggleOverlay} from './src/presentation/ui';

type AppScreen = 'welcome' | 'explorer' | 'specBoard';

function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleExplore = useCallback(() => {
    setScreen('explorer');
  }, []);

  const handleSelectVehicle = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setScreen('specBoard');
  }, []);

  const handleBackFromSpecBoard = useCallback(() => {
    setScreen('explorer');
  }, []);

  const handleAskGenesisAI = useCallback((_vehicle: Vehicle) => {
    // Genesis AI overlay will be wired in a follow-up screen.
  }, []);

  const handleTestDrive = useCallback((_vehicle: Vehicle) => {
    // Test drive flow will be wired when backend integration lands.
  }, []);

  return (
    <AppProviders>
      <LanguageToggleOverlay />
      {screen === 'welcome' ? (
        <WelcomeScreen onExplore={handleExplore} />
      ) : null}
      {screen === 'explorer' ? (
        <VehicleExplorerScreen onSelectVehicle={handleSelectVehicle} />
      ) : null}
      {screen === 'specBoard' && selectedVehicle ? (
        <SpecBoardScreen
          vehicle={selectedVehicle}
          onBack={handleBackFromSpecBoard}
          onAskGenesisAI={handleAskGenesisAI}
          onTestDrive={handleTestDrive}
        />
      ) : null}
    </AppProviders>
  );
}

export default App;

import React, {useCallback, useMemo, useState} from 'react';

import {AppProviders} from './src/app';
import {ChatRepository} from './src/data/chat/chatRepository';
import type {Vehicle} from './src/domain/vehicle';
import {GenesisAiOverlay} from './src/presentation/overlay';
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatRepository = useMemo(() => new ChatRepository(), []);

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

  const handleOpenGenesisAI = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const handleAskGenesisAI = useCallback((_vehicle: Vehicle) => {
    setIsChatOpen(true);
  }, []);

  const handleCloseGenesisAI = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const handleTestDrive = useCallback((_vehicle: Vehicle) => {
    // Test drive flow will be wired when backend integration lands.
  }, []);

  return (
    <AppProviders>
      {!isChatOpen ? <LanguageToggleOverlay /> : null}
      {screen === 'welcome' ? (
        <WelcomeScreen onExplore={handleExplore} onChat={handleOpenGenesisAI} />
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
      <GenesisAiOverlay
        isOpen={isChatOpen}
        onClose={handleCloseGenesisAI}
        currentVehicle={screen === 'specBoard' ? selectedVehicle : null}
        chatRepository={chatRepository}
      />
    </AppProviders>
  );
}

export default App;

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppProviders} from './src/app';
import {ChatRepository} from './src/data/chat/chatRepository';
import type {Vehicle} from './src/domain/vehicle';
import {GenesisAiOverlay} from './src/presentation/overlay';
import {
  SpecBoardScreen,
  VehicleExplorerScreen,
  WelcomeScreen,
} from './src/presentation/screens';
import {
  BackButton,
  FloatingChatButton,
  LanguageToggleOverlay,
  ScreenEnter,
} from './src/presentation/ui';
import {spacing} from './src/presentation/theme';

type AppScreen = 'welcome' | 'explorer' | 'specBoard';

function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const chatRepository = useMemo(() => new ChatRepository(), []);

  const handleExplore = useCallback(() => {
    setScreen('explorer');
  }, []);

  const handleSelectVehicle = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setScreen('specBoard');
  }, []);

  const handleBack = useCallback(() => {
    if (screen === 'specBoard') {
      setScreen('explorer');
      setSelectedVehicle(null);
      return true;
    }
    if (screen === 'explorer') {
      setScreen('welcome');
      return true;
    }
    return false;
  }, [screen]);

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

  useEffect(() => {
    if (screen === 'welcome') {
      return undefined;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );

    return () => subscription.remove();
  }, [handleBack, screen]);

  const showBackButton = screen !== 'welcome' && !isChatOpen;
  const showLanguageToggle =
    screen !== 'specBoard' && !isChatOpen;
  const showFloatingChat =
    !isChatOpen && screen !== 'welcome';

  return (
    <AppProviders>
      {showLanguageToggle ? <LanguageToggleOverlay /> : null}

      {showBackButton ? (
        <View
          pointerEvents="box-none"
          style={[
            styles.backHost,
            {top: insets.top + spacing.lg, left: insets.left + spacing.lg},
          ]}>
          <BackButton onPress={handleBack} />
        </View>
      ) : null}

      {screen === 'welcome' ? (
        <ScreenEnter key="welcome">
          <WelcomeScreen onExplore={handleExplore} onChat={handleOpenGenesisAI} />
        </ScreenEnter>
      ) : null}

      {screen === 'explorer' ? (
        <ScreenEnter key="explorer">
          <VehicleExplorerScreen onSelectVehicle={handleSelectVehicle} />
        </ScreenEnter>
      ) : null}

      {screen === 'specBoard' && selectedVehicle ? (
        <ScreenEnter key="specBoard">
          <SpecBoardScreen
            vehicle={selectedVehicle}
            onBack={handleBack}
            onAskGenesisAI={handleAskGenesisAI}
            onTestDrive={handleTestDrive}
          />
        </ScreenEnter>
      ) : null}

      {showFloatingChat ? (
        <FloatingChatButton onPress={handleOpenGenesisAI} />
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

const styles = StyleSheet.create({
  backHost: {
    position: 'absolute',
    zIndex: 50,
  },
});

export default App;

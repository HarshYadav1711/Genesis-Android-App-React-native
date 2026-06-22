import {AppProviders} from './src/app';
import {WelcomeScreen} from './src/presentation/screens';
import {LanguageToggleOverlay} from './src/presentation/ui';

function App() {
  return (
    <AppProviders>
      <LanguageToggleOverlay />
      <WelcomeScreen />
    </AppProviders>
  );
}

export default App;

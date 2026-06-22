import {AppProviders} from './src/app';
import {WelcomeScreen} from './src/presentation/screens';

function App() {
  return (
    <AppProviders>
      <WelcomeScreen />
    </AppProviders>
  );
}

export default App;

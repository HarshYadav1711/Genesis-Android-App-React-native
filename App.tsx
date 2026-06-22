import {AppProviders} from './src/app';
import {ScreenContainer} from './src/presentation/ui';

function App() {
  return (
    <AppProviders>
      <ScreenContainer />
    </AppProviders>
  );
}

export default App;

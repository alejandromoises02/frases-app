import { PhrasesProvider } from './context/PhrasesContext';
import { PhrasesAppContainer } from './components/AppContainer';

function App() {
  return (
    <PhrasesProvider>
      <PhrasesAppContainer />
    </PhrasesProvider>
  );
}

export default App;

import { useEntities } from './hooks/useEntities';
import { ActionBar } from './components/ActionBar';
import { VirtualTable } from './components/VirtualTable';
import './App.css';

function App() {
  const { loading, error } = useEntities();

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <p>Loading entities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container" role="alert">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <p className="error-hint">
            Make sure the JSON server is running on port 8000.
            <br />
            Run: <code>pnpm json-server</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Entity Data Table</h1>
        <p className="subtitle">1000+ virtualized rows</p>
      </header>
      <main className="app-main">
        <ActionBar />
        <VirtualTable />
      </main>
    </div>
  );
}

export default App;

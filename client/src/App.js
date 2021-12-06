import ErrorDisplay from "./components/errorDisplay/ErrorDisplay.js";
import Loading from "./components/loading/Loading.js";
import { useGetRushingList  } from './hooks/appHooks.js';
import { Table } from './components/table/Table';
import { RUSHING_COLUMNS } from "./components/table/columns/rushingColumns.js";
import { ListProvider } from "./contexts/listContext.js";

import './App.css';

const App = () => {
  const { data, loading, error } = useGetRushingList();
  return (
      <div className="App">
        {loading && <Loading/>}
        {error && <ErrorDisplay error={error}/>}
        {data && !error && <ListProvider data={data}> <Table col={RUSHING_COLUMNS} /> </ListProvider>}
      </div>
    
  );
}

export default App;

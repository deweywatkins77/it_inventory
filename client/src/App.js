import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './index.css'
import Header from './components/Header'
import Home from './pages/Home'
import Device from './pages/Device'
import AddDevice from './pages/AddDevice';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddDevice' element={<AddDevice />} />
            <Route path='/device/:deviceId' element={<Device />} />
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
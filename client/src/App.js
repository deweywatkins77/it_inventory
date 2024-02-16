import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import 'normalize.css'
import './index.css';
import Header from './components/Header';
import Home from './pages/Home';
import Device from './pages/Device';
import AddDevice from './pages/AddDevice';
import SurplusList from './pages/SurplusList';
import SurplusForm from './pages/SurplusForm'
import QRCodes from './pages/QRCodes';

const client = new ApolloClient({
  uri: 'https://inventory-it-ed38a4d87743.herokuapp.com/graphql',
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
            <Route path='/SurplusList' element={<SurplusList />} />
            <Route path='/SurplusForm' element={<SurplusForm />} />
            <Route path='/QRCodes' element={<QRCodes />} />
            <Route path='/device/:deviceId' element={<Device />} />
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
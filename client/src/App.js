import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Tarot from './pages/Tarot';
import Store from './pages/Store';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import ImageUpload from './pages/ImageUpload';
import FortuneTelling from './pages/FortuneTelling';
import ProphecyHistory from './pages/ProphecyHistory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className="flex flex-col h-screen bg-slate-950 text-white p-6"
          style={
            {
              // background:
              //   'linear-gradient(180deg, rgba(83,4,125,0.7) 0%, rgba(0,0,0,0.8) 100%),url(/src/img/site/tarot-table.jpg) center/cover no-repeat',
            }
          }>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tarot" element={<Tarot />} />
              <Route path="/store" element={<Store />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/products/:id" element={<Detail />} />
              <Route path="/iupload" element={<ImageUpload />} />
              <Route path="/fortuneTelling" element={<FortuneTelling />} />
              <Route path="/prophecyHistory" element={<ProphecyHistory />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

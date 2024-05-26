import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Layout from './components/Layout';


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
  const location = useLocation();
  const hideNavigation = ['/rides/', '/profiles/', '/me'].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Layout>
            {/* {!hideNavigation && <Navigation />} */}
            <Header />
            <Outlet />
            <Footer />
          </Layout>
        </div>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;

/* eslint-disable */
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { useApollo } from '../lib/apolloClient';
import '../../styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <div style={{ margin: '20px' }}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// Import apollo dependencies
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Routing
import { BrowserRouter } from 'react-router-dom';

// Create link to endpoint of GraphQL server
const httpLink = new createHttpLink({
    uri: 'http://localhost:4000'
});

// Create apollo client
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
serviceWorker.unregister();

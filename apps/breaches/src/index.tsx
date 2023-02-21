import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import { RestLink } from "apollo-link-rest";
import App from "./app";

const restLink = new RestLink({
  uri: "https://damp-plains-48711.herokuapp.com/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const Root = () => (
  <SnackbarProvider maxSnack={3}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </SnackbarProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

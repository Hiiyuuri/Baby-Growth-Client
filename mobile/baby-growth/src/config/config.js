import { ApolloClient, InMemoryCache } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'https://restaurant-app-apolo.herokuapp.com/',
    // uri: 'http://192.168.0.114:4000',
    cache: new InMemoryCache(), 
  });
  
  export default client;
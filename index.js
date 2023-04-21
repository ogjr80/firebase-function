const functions = require("firebase-functions");
const {ApolloServer} = require("apollo-server-cloud-functions");
const typeDefs = require('./schema'); 
const resolvers = require('./resolvers'); 

const server = new ApolloServer({typeDefs, resolvers});

exports.graphql = functions
    .region("europe-west3")
    .https.onRequest(server.createHandler());
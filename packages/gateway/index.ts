import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import * as fs from 'fs';
import * as path from 'path';

const supergraphSdl = fs
    .readFileSync(path.resolve(__dirname, './supergraph.graphql'))
    .toString();

const gateway = new ApolloGateway({
    supergraphSdl,
});

const server = new ApolloServer({
    gateway,
});

server.listen(4000).then(({ url }) => {
    console.log(`Gateway running at ${url}`);
});

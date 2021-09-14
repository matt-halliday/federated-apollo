import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildFederatedSchema } from '@apollo/federation';

export const buildServer = (typeDefs, resolvers) => {
    return new ApolloServer({
        schema: buildFederatedSchema([
            {
                typeDefs,
                resolvers,
            },
        ]),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
};

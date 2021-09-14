import { ApolloServer, gql } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import * as console from 'console';

gql`
    scalar _Any
    scalar _FieldSet

    # a union of all types that use the @key directive
    union _Entity = Weather | City

    type _Service {
        sdl: String
    }

    extend type Query {
        _entities(representations: [_Any!]!): [_Entity]!
        _service: _Service!
    }

    directive @external on FIELD_DEFINITION
    directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
    directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
    directive @key(fields: _FieldSet!) repeatable on OBJECT | INTERFACE

    # this is an optional directive discussed below
    directive @extends on OBJECT | INTERFACE
`;

const gateway = new ApolloGateway({
    serviceList: [
        {
            name: 'city',
            url: 'http://localhost:4001',
        },
        {
            name: 'weather',
            url: 'http://localhost:4002',
        },
    ],
});

(async () => {
    const { schema, executor } = await gateway.load();

    const server = new ApolloServer({
        schema,
        executor,
    });

    server.listen(4000).then(({ url }) => {
        console.log(`Gateway running at ${url}`);
    });
})();

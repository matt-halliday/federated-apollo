import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import * as console from 'console';

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

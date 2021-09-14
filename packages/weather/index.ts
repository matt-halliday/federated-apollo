import { gql } from 'apollo-server';
import weatherData from './weather.json';
import { buildServer } from 'lib';
import * as console from 'console';

const typeDefs = gql`
    type Weather @key(fields: "code") {
        code: ID
        name: String
    }

    type Query {
        allWeather: [Weather]
    }
`;

const resolvers = {
    Query: {
        allWeather: () => weatherData,
    },
    Weather: {
        __resolveReference: (reference) =>
            weatherData.find((weather) => weather.code === reference.code),
    },
};

const server = buildServer(typeDefs, resolvers);

server.listen(4002).then(({ url }) => {
    console.log(`Weather server running at ${url}`);
});

import weatherData from './weather.json';
import { buildServer } from '../lib';
import * as fs from 'fs';
import * as path from 'path';
import { gql } from 'apollo-server';

const typeDefs = gql(
    fs.readFileSync(path.resolve(__dirname, './weather.graphql'), {
        encoding: 'utf-8',
    })
);

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

import cityData from './cities.json';
import { buildServer } from '../lib';
import { gql } from 'apollo-server';
import * as fs from 'fs';
import * as path from 'path';

const typeDefs = gql(
    fs.readFileSync(path.resolve(__dirname, './city.graphql'), {
        encoding: 'utf-8',
    })
);
const resolvers = {
    Query: {
        allCities: () => cityData,
    },
    City: {
        currentWeather: (city) => {
            return { __typeName: 'Weather', code: city.weatherCode };
        },
    },
    Weather: {
        cities: (weather) =>
            cityData.filter((city) => city.weatherCode === weather.code),
    },
};

const server = buildServer(typeDefs, resolvers);

server.listen(4001).then(({ url }) => {
    console.log(`Cities server running at ${url}`);
});

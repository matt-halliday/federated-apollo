import { gql } from 'apollo-server';
import cityData from './cities.json';
import { buildServer } from 'lib';

const typeDefs = gql`
    type City {
        name: String
        weatherCode: ID
        currentWeather: Weather
    }

    extend type Weather @key(fields: "code") {
        code: ID! @external
    }

    type Query {
        allCities: [City]
    }
`;

const resolvers = {
    Query: {
        allCities: () => cityData,
    },
    City: {
        currentWeather: (city) => {
            return { __typeName: 'Weather', code: city.weatherCode };
        },
    },
};

const server = buildServer(typeDefs, resolvers);

server.listen(4001).then(({ url }) => {
    console.log(`Cities server running at ${url}`);
});

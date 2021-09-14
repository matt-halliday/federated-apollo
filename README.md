# Federated Apollo

Just messing around.

Run `npm i` to install stuff.

Run `npm run build && npm run start` to create local set up.

Visit http://localhost:4000/graphql to do queries n that.

One query that demonstrates resolving an external entity through
the gateway is:

```graphql
query {
    allCities {
        name
        currentWeather {
            name
            code
        }
    }
}
```

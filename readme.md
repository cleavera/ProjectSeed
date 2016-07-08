# node-typescript-domain-modeller

This is a package for easily creating domains from models.

## Installation

1. Download the package (not yet registered on npm)
2. Globally install ts-node and typescript
```
npm install -g ts-node
npm install -g typescript
```
3. Run npm install
```
npm install
```

## About

This package allow to easily create persisted domains, leveraging the power of typescript to make a domain as easy to
set up as possible. You define models and use annotations to create validation rules on properties, when the server is
run the code will create tables for each model. The interface for the domain is a restful JSON API which loosely follows
the JSON API spec (http://jsonapi.org). The JSON api is fully hypermedia ready so all resources should be navigable from
the root.

## Example

An example is included in the package under example folder, you can run it by running "runExample"
```
npm run runExample
```
This will be deployed to port 1337.


import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { type BeachStructure, type BeachStateStructure } from "../../types";

const beachesFactory = Factory.define<BeachStructure>(() => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  image: faker.image.dataUri(),
  region: faker.location.county(),
  town: faker.location.city(),
  services: {
    baywatch: faker.datatype.boolean(),
    dogsAllowed: faker.datatype.boolean(),
    familyBeach: faker.datatype.boolean(),
    restaurant: faker.datatype.boolean(),
    secretBeach: faker.datatype.boolean(),
    showers: faker.datatype.boolean(),
    umbrellas: faker.datatype.boolean(),
  },
  users: faker.string.alphanumeric(),
  addServices: faker.word.adjective(),
  id: faker.string.alphanumeric(),
}));

export const getBeachesMock = (number: number) =>
  beachesFactory.buildList(number);

export const getRequestBeachMock = (data?: BeachStateStructure) =>
  beachRequestFactory.build(data);

export const getResponseBeachMock = (data?: BeachStructure) =>
  beachesFactory.build(data);

const beachRequestFactory = Factory.define<BeachStateStructure>(() => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  image: faker.image.dataUri(),
  region: faker.location.county(),
  town: faker.location.city(),
  services: {
    baywatch: faker.datatype.boolean(),
    dogsAllowed: faker.datatype.boolean(),
    familyBeach: faker.datatype.boolean(),
    restaurant: faker.datatype.boolean(),
    secretBeach: faker.datatype.boolean(),
    showers: faker.datatype.boolean(),
    umbrellas: faker.datatype.boolean(),
  },
  addServices: faker.word.adjective(),
}));

import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { type BeachStructure } from "../../types";
import { Types } from "mongoose";

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
  user: new Types.ObjectId().toString(),
  addServices: faker.word.adjective(),
  id: faker.string.alphanumeric(),
}));

export const getBeachesMock = (number: number) =>
  beachesFactory.buildList(number);

export const getResponseBeachMock = (data?: BeachStructure) =>
  beachesFactory.build(data);

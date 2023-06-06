import { Types } from "mongoose";
import { type BeachStructure, type BeachDocumentStructure } from "../types";
import { getBeachesMock } from "./factories/beachfactories";

export const mockBeaches: BeachDocumentStructure[] = [
  {
    services: {
      baywatch: true,
      umbrellas: true,
      dogsAllowed: false,
      showers: true,
      familyBeach: false,
      restaurant: true,
      secretBeach: true,
    },
    addServices: "It's nude",
    name: "Tossa de Mar Beach",
    image: "https://example.com/tossa_de_mar.jpg",
    description:
      "Tossa de Mar Beach is a stunning crescent-shaped beach nestled in the town of Tossa de Mar. It is renowned for its medieval castle overlooking the shoreline.",
    region: "Costa Brava",
    town: "Tossa de Mar",
    users: "6470de574da09294395a6eaa",
    _id: new Types.ObjectId(),
  },
  {
    services: {
      baywatch: false,
      umbrellas: true,
      dogsAllowed: true,
      showers: true,
      familyBeach: true,
      restaurant: true,
      secretBeach: false,
    },
    name: "Cala Perduda",
    image: "https://what.jpg",
    description: "Playa inventada.",
    region: "Costa Brava",
    town: "Tossa de Mar",
    users: "w847y5ern93oxmdsgkigfdfghjh",
    _id: new Types.ObjectId(),
  },
];

export const mockedBeaches: BeachStructure[] = getBeachesMock(4);
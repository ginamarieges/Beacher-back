import { Types } from "mongoose";
import { type BeachDocumentStructure } from "../types";

export const mockBeaches: BeachDocumentStructure[] = [
  {
    services: {
      lifeguard: true,
      umbrellas: true,
      dogsAllowed: false,
      showers: true,
    },
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
      lifeguard: false,
      umbrellas: true,
      dogsAllowed: true,
      showers: true,
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

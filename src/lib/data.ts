export type Campaign = {
  id: string;
  name: string;
  bigQuery: {
    projectId: string;
    iterationId: string;
  };
  typeform: {
    visitorsFormId: string;
    subscribersFormId: string;
  };
};

export const campaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "Spectrum Keyboard",
    bigQuery: {
      projectId: "8d70d9a1-efe8-4ec3-9ff5-2015680a89d1",
      iterationId: "22c2c584-aae1-413d-9879-86e24705cac5",
    },
    typeform: {
      visitorsFormId: "Hxa6ODRi",
      subscribersFormId: "VF7Y5tIM",
    },
  },
  {
    id: "campaign-2",
    name: "Fusion Axis",
    bigQuery: {
      projectId: "20e07826-39d6-4b38-a3c2-7ea4281e4c3d",
      iterationId: "c8753ae4-0c9b-4f5c-bbda-a4acce49288a",
    },
    typeform: {
      visitorsFormId: "YkdKhI9b",
      subscribersFormId: "jTVgQuD8",
    },
  },
  {
    id: "campaign-3",
    name: "Genesis Modular Mouse System",
    bigQuery: {
      projectId: "6d81b9ef-ccb7-4462-a2b5-0bdb049f3093",
      iterationId: "1dc9f0fe-0b3c-4802-8cb9-59e04ba73054",
    },
    typeform: {
      visitorsFormId: "YAwy3C49",
      subscribersFormId: "pEv0c5fW",
    },
  },
  {
    id: "campaign-4",
    name: "The BOX",
    bigQuery: {
      projectId: "a762498c-8e1f-479a-be38-abb43214b41c",
      iterationId: "e42c54e9-1ba7-4429-920c-0ae33994ddab",
    },
    typeform: {
      visitorsFormId: "OqL2ZWjy",
      subscribersFormId: "knrR7Ahd",
    },
  },
  {
    id: "campaign-5",
    name: "Serene Flow",
    bigQuery: {
      projectId: "2d774d4d-c857-4a14-91b7-a22f49a03ae9",
      iterationId: "69fd84b8-bbe6-4e27-81d9-2742e95abc28",
    },
    typeform: {
      visitorsFormId: "bKwyzgGM",
      subscribersFormId: "KkGEadyj",
    },
  },
];

export function getCampaign(id: string) {
  return campaigns.find((c) => c.id === id);
}

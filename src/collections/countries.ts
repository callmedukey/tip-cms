import { CollectionConfig } from "payload/types";


export const Countries: CollectionConfig = {
  slug: "countries",
  access: {
    read: () => true,
  },
  labels: {
    singular: "Country",
    plural: "Countries",
  },
  admin:{
    useAsTitle: "name",
    
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Country Name",
      required: true,  
    },
]
};

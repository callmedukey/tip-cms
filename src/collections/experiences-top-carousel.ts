import { CollectionConfig } from "payload/types";

export const ExperiencesTopCarousel: CollectionConfig = {
  slug: "experiences-top-carousel",
  labels: {
    singular: "Experience Top Carousel",
    plural: "Experience Top Carousels",
  }, 
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "en_title",
      type: "text",
      label: "English Title",
      required: true,
    },
    {
      name: "kr_title",
      type: "text",
      label: "Korean Title",
      required: true,
    },
    {
      name: "en_subText",
      type: "text",
      label: "English Sub Text",
      required: true,
    },
    {
      name: "kr_subText",
      type: "text",
      label: "Korean Sub Text",
      required: true,
    },
    {
      name: "link",
      type: "text",
      label: "Link",
      required: true,
    },
    {
      name: "thumbnail",
      relationTo: "media",
      type: "upload",
      label: "Thumbnail",
      required: true,
    },
   
    {
        name: "order",
        type: "number",
        label: "Order",
        required: true,
      },
  ],
};

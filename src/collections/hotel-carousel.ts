import { CollectionConfig } from "payload/types";

export const PartnerHotelsCarousel: CollectionConfig = {
  slug: "partner-hotels-carousel",
  labels: {
    singular: "Hotel Carousel",
    plural: "Hotel Carousels",
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
      name: "leftThumbnail",
      relationTo: "media",
      type: "upload",
      label: "Left Thumbnail",
      required: true,
    },
    {
      name: "centerThumbnail",
      relationTo: "media",
      type: "upload",
      label: "Center Thumbnail",
      required: true,
    },
    {
      name: "rightThumbnail",
      relationTo: "media",
      type: "upload",
      label: "Right Thumbnail",
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

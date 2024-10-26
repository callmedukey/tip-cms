import { CollectionConfig } from "payload/types";
import formatSlug from "../utils/formatSlug";

export const PartnerHotels: CollectionConfig = {
  slug: "partner-hotels",
  labels: {
    singular: "Hotel",
    plural: "Hotels",
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
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      admin:{
        position: "sidebar",
      },
     
      hooks: {
        beforeValidate: [
          formatSlug("en_title"),
        ],
      },
    },
    {
      name: "en_keywords",
      type: "text",
      label: "English Keywords",
      required: true,
      admin:{
        position: "sidebar",
      },
    },
    {
      name: "kr_keywords",
      type: "text",
      label: "Korean Keywords",
      required: true,
      admin:{
        position: "sidebar",
      },
    },
    {
      name: "thumbnail",
      relationTo: "media",
      type: "upload",
      label: "Thumbnail",
      required: true,
    },
    {
      name: "en_content",
      type: "richText",
      label: "English Content",
      required: true
    },
    {
      name: "kr_content",
      type: "richText",
      label: "Korean Content",
      required: true
    },
  ],
};

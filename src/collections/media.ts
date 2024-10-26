import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "en_alt",
      type: "text",
      label: "English Alt",
    },
    {
      name: "kr_alt",
      type: "text",
      label: "Korean Alt",
    },
  ],
};

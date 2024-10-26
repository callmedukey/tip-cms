import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { Media } from './collections/media'
import { PartnerHotels } from './collections/hotels'
import { PartnerHotelsCarousel } from './collections/hotel-carousel'
import { ExperiencesTopCarousel } from './collections/experiences-top-carousel'
import { ExperiencesBottomCarousel } from './collections/experiences-bottom-carousel'
import { Experiences } from './collections/experiences'
export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Media, PartnerHotels, PartnerHotelsCarousel,Experiences, ExperiencesTopCarousel, ExperiencesBottomCarousel],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  i18n: {
    fallbackLng: "ko",
  },
})

import Airtable from 'airtable'

export const base = new Airtable({apiKey: process.env.VUE_APP_APYKEY})
    .base(process.env.VUE_APP_AT_BASE)
const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");


export const JsonForms=pgTable('JsonForms', {
    id:serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    createdBy:varchar('createdBy').notNull(),
    created:varchar('createdAt').notNull()
})
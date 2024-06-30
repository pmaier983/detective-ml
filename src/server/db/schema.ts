import { relations, sql, type InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { type AdapterAccount } from "next-auth/adapters"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `detective-ml_${name}`)

export const cases = createTable("case", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  intro: text("intro").notNull(),
  whoDoneItId: varchar("whoDoneItId", { length: 255 }).notNull(),
})
export type DbCase = InferSelectModel<typeof cases>
export const dbCaseSchema = createInsertSchema(cases)

export const casesRelations = relations(cases, ({ many }) => ({
  suspects: many(suspects),
}))

export const suspects = createTable("suspect", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  // TODO: add first name and last name and migrate this to fullName
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  // TODO: figure out the proper type for an image url.
  imageUrl: varchar("imageUrl", { length: 8191 }).notNull(),
  caseId: varchar("caseId", { length: 255 })
    .notNull()
    .references(() => cases.id),
})
export type DbSuspect = InferSelectModel<typeof suspects>
export const dbSuspectSchema = createInsertSchema(suspects)

export const suspectsRelations = relations(suspects, ({ one }) => ({
  case: one(cases, { fields: [suspects.caseId], references: [cases.id] }),
  facts: one(suspectFacts, {
    fields: [suspects.id],
    references: [suspectFacts.suspectId],
  }),
}))

export const suspectFacts = createTable("suspectFact", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  suspectId: varchar("suspectId", { length: 255 })
    .notNull()
    .references(() => suspects.id),
  fact: text("fact").notNull(),
})

export const suspectFactsRelations = relations(suspectFacts, ({ many }) => ({
  suspects: many(suspectFacts),
}))

/****************************** DEFAULT NEXT_AUTH STUFF *****************************************/
export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const quoteRequests = mysqlTable("quote_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  projectType: varchar("project_type", { length: 80 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

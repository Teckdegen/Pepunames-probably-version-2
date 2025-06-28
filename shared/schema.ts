import { pgTable, text, serial, integer, boolean, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const domains = pgTable("domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  domainName: text("domain_name").notNull(),
  walletAddress: text("wallet_address").notNull(),
  txHash: text("tx_hash").notNull(),
  paymentAmount: text("payment_amount").notNull(),
  paymentConfirmed: boolean("payment_confirmed").default(false),
  expiresAt: timestamp("expires_at").notNull(),
  reservedAt: timestamp("reserved_at").defaultNow(),
  confirmationTime: timestamp("confirmation_time"),
  notificationSent: boolean("notification_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pendingDomains = pgTable("pending_domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  domainName: text("domain_name").notNull(),
  walletAddress: text("wallet_address").notNull(),
  txHash: text("tx_hash"),
  expiresAt: timestamp("expires_at").notNull(),
  initiatedAt: timestamp("initiated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactionLogs = pgTable("transaction_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  domainName: text("domain_name").notNull(),
  walletAddress: text("wallet_address").notNull(),
  txHash: text("tx_hash"),
  amount: text("amount").notNull(),
  status: text("status").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notificationLogs = pgTable("notification_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  domainId: uuid("domain_id").references(() => domains.id),
  status: text("status").notNull(),
  errorMessage: text("error_message"),
  attemptCount: integer("attempt_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDomainSchema = createInsertSchema(domains).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPendingDomainSchema = createInsertSchema(pendingDomains).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionLogSchema = createInsertSchema(transactionLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNotificationLogSchema = createInsertSchema(notificationLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Domain = typeof domains.$inferSelect;
export type InsertDomain = z.infer<typeof insertDomainSchema>;
export type PendingDomain = typeof pendingDomains.$inferSelect;
export type InsertPendingDomain = z.infer<typeof insertPendingDomainSchema>;
export type TransactionLog = typeof transactionLogs.$inferSelect;
export type InsertTransactionLog = z.infer<typeof insertTransactionLogSchema>;
export type NotificationLog = typeof notificationLogs.$inferSelect;
export type InsertNotificationLog = z.infer<typeof insertNotificationLogSchema>;

import { 
  users, domains, pendingDomains, transactionLogs, notificationLogs,
  type User, type InsertUser, type Domain, type InsertDomain,
  type PendingDomain, type InsertPendingDomain, type TransactionLog,
  type InsertTransactionLog, type NotificationLog, type InsertNotificationLog
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Domain operations
  checkDomainAvailability(domainName: string): Promise<boolean>;
  getDomainByName(domainName: string): Promise<Domain | undefined>;
  reserveDomainTemporarily(domain: InsertPendingDomain): Promise<PendingDomain>;
  confirmDomainRegistration(domainName: string, walletAddress: string, txHash: string, paymentAmount: string): Promise<Domain>;
  
  // Transaction operations
  logTransaction(transaction: InsertTransactionLog): Promise<TransactionLog>;
  
  // Notification operations
  logNotification(notification: InsertNotificationLog): Promise<NotificationLog>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Domain operations
  async checkDomainAvailability(domainName: string): Promise<boolean> {
    const existingDomain = await db.select().from(domains).where(eq(domains.domainName, domainName));
    const pendingDomain = await db.select().from(pendingDomains).where(eq(pendingDomains.domainName, domainName));
    return existingDomain.length === 0 && pendingDomain.length === 0;
  }

  async getDomainByName(domainName: string): Promise<Domain | undefined> {
    const result = await db.select().from(domains).where(eq(domains.domainName, domainName));
    return result[0];
  }

  async reserveDomainTemporarily(domain: InsertPendingDomain): Promise<PendingDomain> {
    const result = await db.insert(pendingDomains).values(domain).returning();
    return result[0];
  }

  async confirmDomainRegistration(
    domainName: string, 
    walletAddress: string, 
    txHash: string, 
    paymentAmount: string
  ): Promise<Domain> {
    // Remove from pending domains
    await db.delete(pendingDomains).where(eq(pendingDomains.domainName, domainName));
    
    // Add to confirmed domains
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year from now
    
    const domainData: InsertDomain = {
      domainName,
      walletAddress,
      txHash,
      paymentAmount,
      paymentConfirmed: true,
      expiresAt,
      confirmationTime: new Date(),
    };
    
    const result = await db.insert(domains).values(domainData).returning();
    return result[0];
  }

  // Transaction operations
  async logTransaction(transaction: InsertTransactionLog): Promise<TransactionLog> {
    const result = await db.insert(transactionLogs).values(transaction).returning();
    return result[0];
  }

  // Notification operations
  async logNotification(notification: InsertNotificationLog): Promise<NotificationLog> {
    const result = await db.insert(notificationLogs).values(notification).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();

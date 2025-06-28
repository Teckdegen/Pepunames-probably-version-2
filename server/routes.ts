import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPendingDomainSchema, insertTransactionLogSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Domain availability check
  app.get("/api/domains/check/:domainName", async (req, res) => {
    try {
      const { domainName } = req.params;
      const isAvailable = await storage.checkDomainAvailability(domainName);
      res.json({ available: isAvailable, domain: domainName });
    } catch (error) {
      console.error("Error checking domain availability:", error);
      res.status(500).json({ error: "Failed to check domain availability" });
    }
  });

  // Reserve domain temporarily
  app.post("/api/domains/reserve", async (req, res) => {
    try {
      const domainData = insertPendingDomainSchema.parse(req.body);
      const reserved = await storage.reserveDomainTemporarily(domainData);
      res.json(reserved);
    } catch (error) {
      console.error("Error reserving domain:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid domain data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to reserve domain" });
      }
    }
  });

  // Confirm domain registration
  app.post("/api/domains/confirm", async (req, res) => {
    try {
      const { domainName, walletAddress, txHash, paymentAmount } = req.body;
      
      if (!domainName || !walletAddress || !txHash || !paymentAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const confirmedDomain = await storage.confirmDomainRegistration(
        domainName,
        walletAddress,
        txHash,
        paymentAmount
      );
      
      res.json(confirmedDomain);
    } catch (error) {
      console.error("Error confirming domain registration:", error);
      res.status(500).json({ error: "Failed to confirm domain registration" });
    }
  });

  // Log transaction
  app.post("/api/transactions/log", async (req, res) => {
    try {
      const transactionData = insertTransactionLogSchema.parse(req.body);
      const logged = await storage.logTransaction(transactionData);
      res.json(logged);
    } catch (error) {
      console.error("Error logging transaction:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid transaction data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to log transaction" });
      }
    }
  });

  // Get domain by name
  app.get("/api/domains/:domainName", async (req, res) => {
    try {
      const { domainName } = req.params;
      const domain = await storage.getDomainByName(domainName);
      
      if (!domain) {
        return res.status(404).json({ error: "Domain not found" });
      }
      
      res.json(domain);
    } catch (error) {
      console.error("Error getting domain:", error);
      res.status(500).json({ error: "Failed to get domain" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

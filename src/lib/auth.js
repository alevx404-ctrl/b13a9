// src/lib/auth.js
import dns from "node:dns";

try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch {}

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
});

await client.connect();

const db = client.db("SportNest");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  // Added Google Social Authentication Provider
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
    },
  },
});
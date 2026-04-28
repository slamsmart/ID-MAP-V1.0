import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("kontributor"),
      v.literal("verifikator"),
      v.literal("csr_partner"),
      v.literal("admin")
    ),
    authProvider: v.union(v.literal("email"), v.literal("google")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});

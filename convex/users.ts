import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("kontributor"),
      v.literal("verifikator"),
      v.literal("csr_partner"),
      v.literal("admin")
    ),
    authProvider: v.union(v.literal("email"), v.literal("google")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      role: args.role,
      authProvider: args.authProvider,
      createdAt: Date.now(),
    });
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    role: v.union(
      v.literal("kontributor"),
      v.literal("verifikator"),
      v.literal("csr_partner"),
      v.literal("admin")
    ),
    authProvider: v.union(v.literal("email"), v.literal("google")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (user) {
      return { _id: user._id, name: user.name, email: user.email, role: user.role };
    }

    const id = await ctx.db.insert("users", {
      name: args.email.split("@")[0],
      email: args.email,
      role: args.role,
      authProvider: args.authProvider,
      createdAt: Date.now(),
    });

    return { _id: id, name: args.email.split("@")[0], email: args.email, role: args.role };
  },
});

export const listUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getUsersByRole = query({
  args: {
    role: v.union(
      v.literal("kontributor"),
      v.literal("verifikator"),
      v.literal("csr_partner"),
      v.literal("admin")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), args.role))
      .collect();
  },
});

/* eslint-disable */
/**
 * Generated Convex API stub.
 * Run `npx convex dev` to generate the real types.
 */
import type { FunctionReference } from "convex/server";

type UserRole = "kontributor" | "verifikator" | "csr_partner" | "admin";
type AuthProvider = "email" | "google";

interface RegisterArgs {
  name: string;
  email: string;
  role: UserRole;
  authProvider: AuthProvider;
}

interface LoginArgs {
  email: string;
  role: UserRole;
  authProvider: AuthProvider;
}

interface LoginResult {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface GetUserByEmailArgs {
  email: string;
}

interface GetUsersByRoleArgs {
  role: UserRole;
}

interface UserDoc {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  authProvider: AuthProvider;
  createdAt: number;
}

export declare const api: {
  users: {
    register: FunctionReference<"mutation", "public", RegisterArgs, string>;
    login: FunctionReference<"mutation", "public", LoginArgs, LoginResult>;
    listUsers: FunctionReference<"query", "public", Record<string, never>, UserDoc[]>;
    getUserByEmail: FunctionReference<"query", "public", GetUserByEmailArgs, UserDoc | null>;
    getUsersByRole: FunctionReference<"query", "public", GetUsersByRoleArgs, UserDoc[]>;
  };
};

export declare const internal: Record<string, never>;

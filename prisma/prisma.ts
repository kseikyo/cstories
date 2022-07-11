import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined;
}

export * from "@prisma/client";

const ProxyPrisma = new Proxy(PrismaClient, {
  construct(target, args) {
    if (typeof window !== "undefined") return {};
    // eslint-disable-next-line new-cap
    globalThis.prisma = globalThis.prisma || new target(...args);
    return globalThis.prisma;
  },
});

export const prisma = new ProxyPrisma();

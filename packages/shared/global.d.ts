/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID?: string;
    NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID?: string;
  }
}

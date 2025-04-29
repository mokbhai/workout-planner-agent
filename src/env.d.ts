interface ImportMetaEnv {
  readonly PORT: string;
  readonly DATABASE_URI: string;
  readonly JWT_SECRET: string;
  readonly REDIS_URI: string;
  readonly NODE_ENV: string;
  readonly EVO_SERVER_URL: string;
  readonly EVO_API_KEY: string;
  readonly EVO_INSTANCE: string;
  readonly OTP_TIMEOUT: number;
  readonly COOLDOWN_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

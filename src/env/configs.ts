const envConfigs = {
  development: {
    databaseFile: "dev.db.sqlite3",
    currentFile: "development",
  },
  production: {
    databaseFile: "prod.db.sqlite3",
    currentFile: "production",
  },
  test: {
    databaseFile: "test.db.sqlite3",
    currentFile: "test",
  },
  e2e: {
    databaseFile: "e2e.db.sqlite3",
    currentFile: "e2e",
  },
} as const;

type ConfigsByEnv = {
  readonly databaseFile: string;
  readonly currentFile: keyof EnvConfigs;
};

type EnvConfigs = typeof envConfigs;
type AllowedEnvKeys = keyof EnvConfigs;

function isValidEnv(env: string): env is AllowedEnvKeys {
  return Object.keys(envConfigs).includes(env);
}

export function checkEnv(): AllowedEnvKeys {
  const currentEnv = process.env.CURRENT_ENV;

  if (!currentEnv || !isValidEnv(currentEnv)) {
    throw new Error("Verifique os .env* e os valores em src/env/configs.ts");
  }
  return currentEnv;
}

export function getFullEnv() {
  const currentEnv = checkEnv();
  return envConfigs[currentEnv];
}

export function getEnv<C extends keyof ConfigsByEnv>(key: C) {
  const currentEnv = checkEnv();
  const value = envConfigs[currentEnv][key];
  return value;
}

import { createClient } from "redis"
import { env } from "./env.js";

const client = createClient({
  url: env.REDIS_URL
});

client.on("error", function(err) {
  console.error(`❌ Redis Client Error: ${err}`);
});
await client.connect()

export const setValue = async (key, value) => {
  try {
    await client.set(key, value, {
      EX: 43200
    });
  } catch (err) {
    console.error(`Error setting value for key ${key}:`, err);
  }
};

export const getValue = async (key) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (err) {
    console.error(`Error getting value for key ${key}:`, err);
    return null;
  }
};

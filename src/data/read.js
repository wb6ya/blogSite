import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, "./blogs.json");

export const readFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    const trimmedData = data.trim();

    if (!trimmedData) {
      return [];
    }

    const parsedData = JSON.parse(trimmedData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(`Error reading file ${dataFilePath}:`, error);
    return [];
  }
};

export const saveFile = async (data) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing to file ${dataFilePath}:`, error);
  }
};

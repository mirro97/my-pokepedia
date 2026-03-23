import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchTotalCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/pokemon-species?limit=1`);
  const data = await res.json();
  return data.count;
}

async function fetchKoreanName(id: number, retries = 3): Promise<string | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      const koEntry = data.names.find(
        (n: { language: { name: string }; name: string }) => n.language.name === "ko"
      );
      return koEntry?.name ?? null;
    } catch {
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  console.warn(`Failed to fetch Pokemon #${id} after ${retries} retries`);
  return null;
}

async function main() {
  const total = await fetchTotalCount();
  console.log(`Fetching Korean names for ${total} Pokemon...`);

  const names: Record<number, string> = {};
  const BATCH_SIZE = 20;

  for (let i = 1; i <= total; i += BATCH_SIZE) {
    const batch = Array.from(
      { length: Math.min(BATCH_SIZE, total - i + 1) },
      (_, idx) => i + idx
    );
    const results = await Promise.all(
      batch.map(async (id) => {
        const name = await fetchKoreanName(id);
        return { id, name };
      })
    );
    for (const { id, name } of results) {
      if (name) {
        names[id] = name;
      }
    }
    console.log(`Progress: ${Math.min(i + BATCH_SIZE - 1, total)}/${total}`);
  }

  const output = `// 자동 생성됨 — npm run generate-names
// 생성일: ${new Date().toISOString().split("T")[0]}
// 총 ${Object.keys(names).length}개 포켓몬

export const POKEMON_NAMES_KO: Record<number, string> = ${JSON.stringify(names, null, 2)};
`;

  const outPath = path.resolve(__dirname, "../src/shared/constants/pokemonNames.ts");
  fs.writeFileSync(outPath, output, "utf-8");
  console.log(`\nDone! Written to ${outPath}`);
}

main().catch(console.error);

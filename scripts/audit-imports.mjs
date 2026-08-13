import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd(), files = [];
function walk(d){
  for(const e of fs.readdirSync(d,{withFileTypes:true})){
    if(["node_modules",".next",".git"].includes(e.name)) continue;
    const p=path.join(d,e.name);
    e.isDirectory()?walk(p):/\.(ts|tsx)$/.test(e.name)&&files.push(p);
  }
}
walk(root);
const missing=[];
for(const f of files){
  const s=fs.readFileSync(f,"utf8");
  for(const m of s.matchAll(/from\s+["'](@\/[^"']+)["']/g)){
    const b=path.join(root,m[1].slice(2));
    if(![b,b+".ts",b+".tsx",path.join(b,"index.ts"),path.join(b,"index.tsx")].some(fs.existsSync)) missing.push(`${path.relative(root,f)} -> ${m[1]}`);
  }
}
console.log(`Scanned ${files.length} TypeScript/TSX files.`);
if(missing.length){
  console.error(missing.join("\n"));
  process.exit(1);
}
console.log("0 missing internal imports.");

console.log("\nDependency security report (non-blocking):");
const audit = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["audit"], { stdio: "inherit" });
if (audit.error) console.warn(`npm audit could not run: ${audit.error.message}`);
else console.log(`npm audit exit code: ${audit.status ?? "unknown"} (reporting only)`);

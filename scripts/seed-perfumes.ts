import { execFileSync } from 'node:child_process'

console.warn('seed-perfumes is deprecated; generating the ORVÉN watch catalog instead.')
execFileSync('node', ['scripts/seed-demo.mjs'], { stdio: 'inherit', env: process.env })

import { execFileSync } from 'node:child_process'

const env = { ...process.env }

function run(command, args) {
  console.log(`\n> ${command} ${args.join(' ')}`)
  execFileSync(command, args, { stdio: 'inherit', env })
}

run('npx', ['prisma', 'generate'])

if (process.env.DATABASE_URL && process.env.AUTO_SYNC_DATABASE !== 'false') {
  try {
    run('npx', ['prisma', 'migrate', 'deploy'])
  } catch (error) {
    console.warn('\nPrisma migrate deploy failed; trying db push for the configured database.')
    run('npx', ['prisma', 'db', 'push', '--skip-generate'])
  }

  if (process.env.SEED_DEMO_DATA === 'true') {
    run('node', ['scripts/seed-demo.mjs'])
  } else {
    console.log('\nSkipping ORVÉN demo catalog because SEED_DEMO_DATA is not true')
  }

  run('node', ['scripts/normalize-orven-content.mjs'])
} else {
  console.warn('\nSkipping database sync and demo seed because DATABASE_URL is not available or AUTO_SYNC_DATABASE=false')
}

run('npx', ['next', 'build'])

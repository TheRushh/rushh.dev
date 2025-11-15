#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function printHeader(text) {
  console.log(`\n${COLORS.bright}${COLORS.cyan}=== ${text} ===${COLORS.reset}\n`)
}

function printScore(label, score, maxScore) {
  const percentage = (score / maxScore) * 100
  const color = percentage >= 80 ? COLORS.green : percentage >= 60 ? COLORS.yellow : COLORS.red
  console.log(`${label}: ${color}${score}/${maxScore} (${percentage.toFixed(1)}%)${COLORS.reset}`)
}

function runCommand(command, silent = false) {
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' })
    return { success: true, output }
  } catch (error) {
    return { success: false, error, output: error.stdout || '' }
  }
}

async function checkTypeScript() {
  printHeader('TypeScript Compilation')
  const result = runCommand('npx tsc --noEmit')
  return result.success ? 100 : 0
}

async function checkESLint() {
  printHeader('ESLint Analysis')
  const result = runCommand('npx eslint . --format json', true)

  if (result.success) {
    console.log(`${COLORS.green}✓ No ESLint errors or warnings${COLORS.reset}`)
    return 100
  }

  try {
    const eslintOutput = JSON.parse(result.output)
    const totalErrors = eslintOutput.reduce((sum, file) => sum + file.errorCount, 0)
    const totalWarnings = eslintOutput.reduce((sum, file) => sum + file.warningCount, 0)

    console.log(`${COLORS.red}✗ Errors: ${totalErrors}${COLORS.reset}`)
    console.log(`${COLORS.yellow}⚠ Warnings: ${totalWarnings}${COLORS.reset}`)

    // Deduct 10 points per error, 5 points per warning (max deduction 100)
    const deduction = Math.min(100, totalErrors * 10 + totalWarnings * 5)
    return Math.max(0, 100 - deduction)
  } catch (e) {
    console.error(`${COLORS.red}✗ ESLint failed to run${COLORS.reset}`)
    return 0
  }
}

async function checkPrettier() {
  printHeader('Code Formatting (Prettier)')
  const result = runCommand('npx prettier --check .', true)

  if (result.success) {
    console.log(`${COLORS.green}✓ All files formatted correctly${COLORS.reset}`)
    return 100
  } else {
    console.log(`${COLORS.yellow}⚠ Some files need formatting${COLORS.reset}`)
    return 70
  }
}

async function checkTests() {
  printHeader('Test Coverage')
  const result = runCommand('npm run test:coverage')

  if (!result.success) {
    console.log(`${COLORS.red}✗ Tests failed${COLORS.reset}`)
    return 0
  }

  // Try to read coverage summary
  const coveragePath = './coverage/coverage-summary.json'
  if (!existsSync(coveragePath)) {
    console.log(`${COLORS.yellow}⚠ Coverage summary not found${COLORS.reset}`)
    return 50
  }

  try {
    const coverage = JSON.parse(readFileSync(coveragePath, 'utf8'))
    const total = coverage.total

    const metrics = {
      lines: total.lines.pct,
      statements: total.statements.pct,
      functions: total.functions.pct,
      branches: total.branches.pct,
    }

    console.log(`${COLORS.cyan}Coverage metrics:${COLORS.reset}`)
    Object.entries(metrics).forEach(([key, value]) => {
      const color = value >= 80 ? COLORS.green : value >= 60 ? COLORS.yellow : COLORS.red
      console.log(`  ${key}: ${color}${value.toFixed(1)}%${COLORS.reset}`)
    })

    // Average coverage percentage
    const avgCoverage =
      Object.values(metrics).reduce((a, b) => a + b, 0) / Object.keys(metrics).length
    return avgCoverage
  } catch (e) {
    console.error(`${COLORS.red}✗ Failed to read coverage data${COLORS.reset}`)
    return 0
  }
}

async function main() {
  console.log(`${COLORS.bright}${COLORS.blue}
╔═══════════════════════════════════════════╗
║     CODE QUALITY CHECK                    ║
╚═══════════════════════════════════════════╝
${COLORS.reset}`)

  const scores = {
    typescript: await checkTypeScript(),
    eslint: await checkESLint(),
    prettier: await checkPrettier(),
    tests: await checkTests(),
  }

  printHeader('Quality Score Summary')

  printScore('TypeScript', scores.typescript, 100)
  printScore('ESLint', scores.eslint, 100)
  printScore('Prettier', scores.prettier, 100)
  printScore('Test Coverage', scores.tests.toFixed(1), 100)

  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length

  const color = overallScore >= 80 ? COLORS.green : overallScore >= 60 ? COLORS.yellow : COLORS.red
  console.log(
    `\n${COLORS.bright}Overall Quality Score: ${color}${overallScore.toFixed(1)}/100${COLORS.reset}\n`
  )

  if (overallScore >= 80) {
    console.log(`${COLORS.green}${COLORS.bright}✓ Excellent code quality!${COLORS.reset}`)
    process.exit(0)
  } else if (overallScore >= 60) {
    console.log(`${COLORS.yellow}${COLORS.bright}⚠ Code quality needs improvement${COLORS.reset}`)
    process.exit(1)
  } else {
    console.log(
      `${COLORS.red}${COLORS.bright}✗ Code quality is below acceptable standards${COLORS.reset}`
    )
    process.exit(1)
  }
}

main().catch(console.error)

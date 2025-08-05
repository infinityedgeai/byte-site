import nextJest from 'next/jest'
import type { Config } from '@jest/types'

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
})

const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(customJestConfig)

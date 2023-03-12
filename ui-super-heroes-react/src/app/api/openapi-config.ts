import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './fight-openapi.yaml',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './fightsApi.ts',
  exportName: 'fightsApi',
  hooks: true,
}

export default config
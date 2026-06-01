import { rolldown } from 'rolldown'

import content from '../src/entrypoints/content'
import wxtConfig from '../wxt.config'

import {
  author,
  description,
  displayName,
  homepage,
  license,
  name,
  userscript,
  version,
} from '../package.json'

function generateHeader() {
  const lines = []

  lines.push('==UserScript==')

  lines.push(`@name ${displayName}`)
  lines.push(`@namespace ${userscript.namespace}`)
  lines.push(`@version ${version}`)
  lines.push(`@description ${description}`)
  lines.push(`@homepage ${homepage}`)
  lines.push(`@author ${author}`)
  lines.push(`@license ${license}`)
  if (Array.isArray(content.matches)) {
    for (const match of content.matches) {
      lines.push(`@match ${match}`)
    }
  }
  if (userscript.icon) {
    lines.push(`@icon ${userscript.icon}`)
  }
  if (typeof content.runAt === 'string') {
    lines.push(`@run-at ${content.runAt.replace('_', '-')}`)
  }
  if (content.allFrames !== true) {
    lines.push('@noframes')
  }
  lines.push(`@updateURL ${userscript.updateURL}`)
  lines.push(`@downloadURL ${userscript.updateURL}`)

  lines.push('==/UserScript==')

  return lines.map((v) => `// ${v}`).join('\n')
}

async function main() {
  const header = generateHeader()

  const bundle = await rolldown({
    input: `${wxtConfig.srcDir ?? '.'}/userscript.ts`,
  })

  await bundle.write({
    file: `${wxtConfig.outDir || '.output'}/${name}.user.js`,
    format: 'iife',
    codeSplitting: false,
    banner: header,
    comments: false,
    strict: true,
  })
}

main()

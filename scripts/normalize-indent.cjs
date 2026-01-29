const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const exts = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json', '.md']

function shouldProcess(file) {
  return exts.includes(path.extname(file)) && !file.includes('node_modules')
}

function normalizeContent(content) {
  return content
    .split('\n')
    .map(line => {
      const m = line.match(/^( +)/)
      if (!m) return line
      const spaces = m[1].length
      const groups = Math.floor(spaces / 4)
      const remainder = spaces % 4
      const newLeading = ' '.repeat(groups * 2 + remainder)
      return newLeading + line.slice(spaces)
    })
    .join('\n')
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue
      walk(full)
    } else if (stat.isFile() && shouldProcess(full)) {
      const content = fs.readFileSync(full, 'utf8')
      const normalized = normalizeContent(content)
      if (normalized !== content) {
        fs.writeFileSync(full, normalized, 'utf8')
        console.log('Normalized:', path.relative(root, full))
      }
    }
  }
}

const target = path.join(root, 'src')
if (!fs.existsSync(target)) {
  console.error('No src/ folder found at', target)
  process.exit(1)
}

walk(target)
console.log('Indent normalization complete.')

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const filterScript = path.join(os.tmpdir(), 'fixitnow-strip-coauthor.js');
fs.writeFileSync(
  filterScript,
  `
let d = '';
process.stdin.on('data', (c) => (d += c));
process.stdin.on('end', () => {
  const out = d
    .replace(/\\r?\\nCo-authored-by: Cursor[^\\r\\n]*/g, '')
    .replace(/[ \\t]+\\n/g, '\\n')
    .replace(/\\n{3,}/g, '\\n\\n')
    .replace(/\\s+$/, '\\n\\n');
  process.stdout.write(out);
});
`
);

process.env.FILTER_BRANCH_SQUELCH_WARNING = '1';
const scriptPath = filterScript.replace(/\\/g, '/');
const cmd = `git filter-branch -f --msg-filter "node \\"${scriptPath}\\"" ac40877..HEAD`;
console.log('Running:', cmd);
execSync(cmd, { stdio: 'inherit', cwd: process.cwd(), shell: true });

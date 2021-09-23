const { spawn } = require('child_process');
const { success, validateEnvs } = require('./utils');

const build = (buildPrefixParams = '' || true) => {
  spawn(
    `node ${buildPrefixParams} ./node_modules/@rescripts/cli/bin/rescripts.js build`,
    {
      stdio: 'inherit',
      shell: true
    }
  );
}

let buildExtraParams = ''
let successMessage = 'Building...'

if (!process.env.VERCEL) {
  const argv = require('minimist')(process.argv.slice(2));

  const env = argv._[0];

  validateEnvs(env);

  buildExtraParams = `./node_modules/env-cmd/bin/env-cmd.js -f ./.env.${env}`;
  successMessage = `Building '${env}'`;
}

success(successMessage);

build(buildExtraParams)
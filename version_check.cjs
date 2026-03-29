const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

try {
  // `.nvmrc` 파일 읽기
  const nvmrcPath = path.resolve('.nvmrc');
  if (!fs.existsSync(nvmrcPath)) {
    console.error('ERROR: .nvmrc file not found!');
    process.exit(1);
  }
  const targetVersion = fs.readFileSync(nvmrcPath, 'utf-8').trim().replace(/^v/, '');

  console.log(`Target Node.js version: v${targetVersion}`);

  // 현재 OS 확인
  const platform = os.platform(); // 'win32', 'darwin', 'linux'

  console.log(`platform: ${platform}`);

  // nvm 초기화
  let nvmScriptPath = null;
  if (platform === 'darwin' || platform === 'linux') {
    nvmScriptPath = path.join(os.homedir(), '.nvm', 'nvm.sh');

    if (!fs.existsSync(nvmScriptPath)) {
      console.error('ERROR: Unable to find ~/.nvm/nvm.sh.');
      process.exit(1);
    }
  }

  // 현재 Node.js 버전 가져오기
  let currentVersion;
  try {
    currentVersion = execSync(
      platform === 'win32' ? 'nvm current' : `zsh -lc "source ${nvmScriptPath} && nvm current"`,
      {
        encoding: 'utf-8',
      }
    )
      .trim()
      .replace(/^v/, '');
  } catch {
    currentVersion = 'none';
  }

  console.log(`Current Node.js version: v${currentVersion}`);

  // Node.js 버전 확인 및 변경
  if (currentVersion === 'none' || currentVersion === '' || currentVersion !== targetVersion) {
    console.log(`Switching to Node.js version v${targetVersion}...`);
    const nvmCommand =
      platform === 'win32'
        ? `nvm install ${targetVersion} && nvm use ${targetVersion}`
        : `zsh -lc "source ${nvmScriptPath} && nvm install ${targetVersion} && nvm use ${targetVersion}"`;

    execSync(nvmCommand, { stdio: 'inherit' });
  } else {
    console.log(`Node.js is already at v${targetVersion}. No changes needed.`);
  }
} catch (error) {
  console.error('ERROR: Failed to execute version_check script.');
  console.error(error.message);
  process.exit(1);
}

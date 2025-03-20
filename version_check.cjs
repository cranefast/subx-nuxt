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
  let nvmInitScript = null;
  if (platform === 'darwin' || platform === 'linux') {
    const homeDir = require('os').homedir();
    const possibleInitFiles = ['.bashrc', '.zshrc', '.bash_profile', '.profile']; // 가능한 초기화 파일

    for (const file of possibleInitFiles) {
      const filePath = path.join(homeDir, file);
      if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8').includes('nvm')) {
        nvmInitScript = filePath;
        break;
      }
    }

    if (!nvmInitScript) {
      console.error('ERROR: Unable to find nvm initialization in shell configuration files.');
      process.exit(1);
    }
  }

  // 현재 Node.js 버전 가져오기
  let currentVersion;
  try {
    currentVersion = execSync(platform === 'win32' ? 'nvm current' : `source ${nvmInitScript} && nvm current`, {
      encoding: 'utf-8',
    })
      .trim()
      .replace(/^v/, '');
  } catch (e) {
    currentVersion = 'none';
  }

  console.log(`Current Node.js version: v${currentVersion}`);

  // Node.js 버전 확인 및 변경
  if (currentVersion === 'none' || currentVersion === '' || currentVersion !== targetVersion) {
    console.log(`Switching to Node.js version v${targetVersion}...`);
    const nvmCommand =
      platform === 'win32'
        ? `nvm install ${targetVersion} && nvm use ${targetVersion}`
        : `'${nvmInitScript} && nvm install ${targetVersion} && nvm use ${targetVersion}'`;

    execSync(nvmCommand, { stdio: 'inherit' });
  } else {
    console.log(`Node.js is already at v${targetVersion}. No changes needed.`);
  }
} catch (error) {
  console.error('ERROR: Failed to execute version_check script.');
  console.error(error.message);
  process.exit(1);
}

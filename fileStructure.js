const fs = require('fs');
const path = require('path');

function printDirectoryTree(dirPath, prefix = '') {
  const files = fs.readdirSync(dirPath);

  files.forEach((file, index) => {
    // Skip node_modules, .git, and .git/objects
    if (file === 'node_modules' || file === '.git') return;

    const isLast = index === files.length - 1;
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    // Skip .git/objects if inside .git folder, but since we skip .git entirely, this is safe
    if (filePath.includes(path.join('.git', 'objects'))) return;

    console.log(prefix + (isLast ? '└── ' : '├── ') + file);

    if (stats.isDirectory()) {
      printDirectoryTree(filePath, prefix + (isLast ? '    ' : '│   '));
    }
  });
}

printDirectoryTree('.');

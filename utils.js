const fs = require('fs');
const path = require('path');

const directory = 'C:/Users/fmg00/Desktop/cmphsi-test';
const scriptTag = '<script src="./restrict.js" ></script>';

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directory, file);

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                let updatedData;
                if (data.includes('<head>')) {
                    updatedData = data.replace('<head>', `<head>\n${scriptTag}`);
                } else {
                    updatedData = `${scriptTag}\n${data}`;
                }

                fs.writeFile(filePath, updatedData, 'utf8', err => {
                    if (err) {
                        console.error('Error writing file:', err);
                    } else {
                        console.log(`Updated file: ${filePath}`);
                    }
                });
            });
        }
    });
});

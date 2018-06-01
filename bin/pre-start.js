const glob = require('glob');
const fs = require('fs');
const path = require('path');

console.log("Cleaning up output directory");
glob(path.resolve(__dirname, '..', 'client', 'public', '**', '*'), (err, files) => {
    console.log(`Found ${files.length} files to delete. Deleting...`);
    files.forEach((file) => {
        fs.unlinkSync(file);
    });

    fs.rmdirSync(path.resolve(__dirname, '..', 'client', 'public'));
    console.log('Cleanup done');
});
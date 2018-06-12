const glob = require('glob');
const fs = require('fs');
const path = require('path');

console.log("Cleaning up output directory");
glob(path.resolve(__dirname, '..', 'client', 'public', '**', '*'), (err, files) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Found ${files.length} files to delete. Deleting...`);
        files.forEach((file) => {
            fs.unlinkSync(file);
        });
    }

    fs.rmdir(path.resolve(__dirname, '..', 'client', 'public'), function (err) {
        if (err) {
            console.error(err);
        }

        console.log('Cleanup done');
    });
});
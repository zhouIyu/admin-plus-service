const inquirer = require('inquirer');
const shell = require('shelljs');

if (!shell.which('git')) {
    shell.exec('git: git not found');
    shell.exit(1);
}

const getVersion = async () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'version',
                choices: ['patch', 'minor', 'major'],
                message: 'please choose argument [major|minor|patch]: '
            }
        ]).then(answer => {
            resolve(answer.version);
        }).catch(err => {
            reject(err);
        });
    });
};

const main = async () => {
    const version = await getVersion();
    shell.echo(`\nReleasing ${version} ...\n`);
    await shell.exec('npm run changelog');
    await shell.exec('git push --follow-tags origin master');

    await shell.exec('git add -A');
    await shell.exec('git commit -m "docs(build): changelog"');
    await shell.exec('git push');
};

main();

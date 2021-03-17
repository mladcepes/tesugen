import arg from 'arg';
import inquirer from 'inquirer';
import {createProject} from "./main";
import chalk from "chalk";

async function getConfig(rawArgs) {
    console.log(chalk.green.bold('#######################'));
    console.log(chalk.green.bold('# Welcome to Tesugen! #'));
    console.log(chalk.green.bold('#######################'));
    console.log(chalk.green.bold('Feel free to contact me for any feedback: mladcepes@gmail.com'));
    const args = arg({
        '--typescript': Boolean,
        '-ts': '--typescript'
    }, {argv: rawArgs.slice(2)})

    const options = {
        directory: args._[0],
        typescript: args['--typescript'] || false
    }

    const questions = []

    questions.push({
        name: 'pkgMgr',
        type: 'list',
        message: 'Choose your package manager',
        choices: ['NPM', 'Yarn'],
        default: 'NPM'
    })

    if (!options.directory) {
        questions.push({
            name: 'directory',
            message: 'Please name your project',
            default: 'test-framework'
        })
    }

    if (!options.feeling) {
        questions.push({
            name: 'feeling',
            message: 'Are you feeling great?',
            default: 'yes'
        })
    }

    const answers = await inquirer.prompt(questions);

    return {
        pkgMgr: answers.pkgMgr,
        directory: options.directory || answers.directory,
        typescript: options.typescript
    }
}

export async function cli(args) {
    const options = await getConfig(args);
    await createProject(options)
}
import fs from 'fs';
import ncp from 'ncp';
import {promisify} from 'util';
import {taskListGenerator} from "./utils";
import chalk from "chalk";
import execa from 'execa';

const regScripts = {
    test:'jest'
}

const typeScripts = {
    test:'jest',
}

const access = promisify(fs.access)
const copy = promisify(ncp)

function addToPkgJson(options) {
    const scripts = options.typescript ? typeScripts : regScripts

    const filename = `${options.targetDirectory}/package.json`

    const rawData = fs.readFileSync(filename);
    fs.unlinkSync(filename)
    const data = JSON.parse(rawData);

    const newData = {...data, scripts}
    const newJSONData = JSON.stringify(newData, null, 2)
    fs.writeFileSync(filename, newJSONData)
}

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    })
}

const files = async options => {
    try {
        await access(options.templateDirectory, fs.constants.R_OK)
    } catch(error) {
        console.error('%s Invalid Template Name', chalk.red.bold('ERROR'))
        console.log(error);
        process.exit(1)
    }

    const task = {
        title: 'Copying Files',
        task: () => copyTemplateFiles(options)
    }

    return task;
}

export const npmSetup = async options => {
    const npmInit = {
        title: 'NPM Init',
        task: async () => {
            const result = await execa('npm', ['init', '-y'], {
                cwd: options.targetDirectory
            })
            if (result.failed) {
                throw new Error(`Failed to initialize package.json`)
            }
        }
    }

    const gitInit = {
        title: 'Git Init',
        task: async () => {
            const result = await execa('git', ['init'], {
                cwd: options.targetDirectory
            });
            console.log(chalk.green.bold(result.stdout))
            if (result.failed) {
                throw new Error(`Failed to initialize Git.`)
            }
        }
    }

    const copyFiles = await files(options)
    const packageJson = {
        title: 'Add Scripts to Package.JSON',
        task: async () => addToPkgJson(options)
    }


    return taskListGenerator('Initializing Project', [copyFiles, gitInit, npmInit, packageJson ], true)
}
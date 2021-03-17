import path from 'path';
import Listr from 'listr';
import {npmSetup} from "./pkgjson";
import {packageList} from "./packages";
import chalk from "chalk";

export const createProject = async (options) => {
    options = {
        ...options,
        template: options.typescript = 'typescript',
        targetDirectory: options.targetDirectory || `${__dirname}/${options.directory}`
    }
    const __template = (() => {let x = path.dirname(decodeURI(new URL(import.meta.url).pathname)); return path.resolve( (process.platform == "win32") ? x.substr(1) : x ); })()
    //const currentUrl = import.meta.url
    const templateDir = path.resolve(__template, '../../templates', options.template.toLowerCase());
    options.templateDirectory = templateDir;

    const npm = await npmSetup(options);
    const packages = packageList(options)
    const allTasks = new Listr([npm, packages]);

    await allTasks.run()
    console.log('%s Installation Complete', chalk.green.bold('DONE'));
    return true
}
import path from 'path';
import Listr from 'listr';
import {npmSetup} from "./pkgjson";
import {packageList} from "./packages";
import chalk from "chalk";

export const createProject = async (options) => {
    options = {
        ...options,
        template: options.typescript = 'typescript',
        targetDirectory: options.targetDirectory || `${process.cwd()}/${options.directory}`
    }

    var currentUrl = import.meta.url;
    var templateDir;

    if(process.platform === "win32") {
        templateDir = path.resolve(new URL(currentUrl).pathname, '../../templates', options.template.toLowerCase()).substring(3);
    } else {
        templateDir = path.resolve(new URL(currentUrl).pathname, '../../templates', options.template.toLowerCase());
    }

    options.templateDirectory = templateDir;

    const npm = await npmSetup(options);
    const packages = packageList(options);
    const allTasks = new Listr([npm, packages]);

    await allTasks.run();
    console.log('%s Installation Complete', chalk.green.bold('DONE'));
    return true;
}
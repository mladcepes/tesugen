import {packageListGenerator, taskListGenerator} from "./utils";
import execa from "execa";

const packages = {
    'class-validator': ['class-validator'],
    jest:['jest'],
    'ts-jest':['ts-jest'],
    'jest-html-reporters': ['jest-html-reporters'],
    supertest: ['supertest'],
    dotenv: ['dotenv']
}

const devPackages = {
    typescript: ['typescript'],
    types: ['@types/node', '@types/jest', '@types/supertest']
}

export const packageList = options => {
    const pkgMgr = options.pkgMgr === 'Yarn' ? 'yarn' : 'npm';
    const pkgMgrFlags = pkgMgr === 'yarn' ? ['add'] : ['i', '-S'];
    const pkgMgrDevFlags = pkgMgr === 'yarn' ? ['add', '--dev'] : ['i', '-D']

    const pkgList = {}

    Object.keys(packages).forEach(pkgs => {
        pkgList[pkgs] = packageListGenerator(pkgMgr, pkgMgrFlags, packages[pkgs], options)
    })

    Object.keys(devPackages).forEach(pkgs => {
        pkgList[pkgs] = packageListGenerator(pkgMgr, pkgMgrDevFlags, devPackages[pkgs], options)
    })

    const typeScriptInit = {
        title: 'TypeScript Initialization',
        task: async () => {
            const result = await execa('npx', ['tsc', '--init', '--module','esnext','--moduleResolution', 'node', '--resolveJsonModule', '--target', 'es2017', '--noImplicitAny', '--sourceMap', '--lib', 'dom,es2017', '--types', 'node,jest', '--experimentalDecorators', 'true', '--emitDecoratorMetadata', 'true'], {
                cwd: options.targetDirectory
            })
            if (result.failed) {
                throw new Error('Failed to create TS Config File')
            }
        }
    }

    const classValidator = taskListGenerator('Class-validator', pkgList['class-validator'], true);
    const jestTask = taskListGenerator('Jest', pkgList['jest'], true);
    const jestHtmlReportersTask = taskListGenerator('JestHTMLReporters', pkgList['jest-html-reporters'], true)
    const dotenvTask = taskListGenerator('Dotenv', pkgList['dotenv'], true);
    const tsJest = taskListGenerator('TS-Jest', pkgList['ts-jest'], true)
    const superTestTask = taskListGenerator('SuperTest', pkgList['supertest'], true)
    const typescriptTask = taskListGenerator('TypeScript Install', pkgList['typescript'], true)
    const typesTask = taskListGenerator('Types', pkgList['types'], true);
    const typeScriptMaster = taskListGenerator('TypeScript', [typescriptTask, typeScriptInit, typesTask], true)

    return taskListGenerator('Installing packages', [classValidator, jestTask, jestHtmlReportersTask, tsJest, superTestTask, dotenvTask ,typeScriptMaster], true)
}
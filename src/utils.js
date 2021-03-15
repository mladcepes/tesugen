
import execa from "execa";
import Listr from 'listr';

export const packageListGenerator = (pkgMgr, flags, packages, options) => {
    return packages.map(pkg => ({
        title: `Installing ${pkg}`,
        task: async () => {
            const result = await execa(pkgMgr, [...flags, pkg], {
                cwd: options.targetDirectory
            })
            if (result.failed) {
                throw new Error(`Failed to install ${pkg}`)
            }
        }
    }))
}

export const taskListGenerator = (title, tasks, enable) => ({
    title,
    enabled: () => enable,
    task: () => new Listr(tasks)
})
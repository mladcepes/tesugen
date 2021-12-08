import { packageListGenerator, taskListGenerator } from "./utils";
import execa from "execa";

const packages = {
  "class-validator": ["class-validator"],
  jest: ["jest"],
  "ts-jest": ["ts-jest"],
  "jest-html-reporters": ["jest-html-reporters"],
  supertest: ["supertest"],
  dotenv: ["dotenv"],
  testyts: ["testyts"],
};

const devPackages = {
  typescript: ["typescript"],
  types: ["@types/node", "@types/supertest"],
};

export const packageList = (options) => {
  const testRunner = options.testRunner;
  if (testRunner === "Jest") devPackages.types.push("@types/jest");
  const pkgMgr = options.pkgMgr === "Yarn" ? "yarn" : "npm";
  const pkgMgrFlags = pkgMgr === "yarn" ? ["add"] : ["i", "-S"];
  const pkgMgrDevFlags = pkgMgr === "yarn" ? ["add", "--dev"] : ["i", "-D"];

  const pkgList = {};

  Object.keys(packages).forEach((pkgs) => {
    pkgList[pkgs] = packageListGenerator(
      pkgMgr,
      pkgMgrFlags,
      packages[pkgs],
      options
    );
  });

  Object.keys(devPackages).forEach((pkgs) => {
    pkgList[pkgs] = packageListGenerator(
      pkgMgr,
      pkgMgrDevFlags,
      devPackages[pkgs],
      options
    );
  });

  const typeScriptInit = {
    title: "TypeScript Initialization",
    task: async () => {
      if (testRunner === "Jest") {
        const result = await execa(
          "npx",
          [
            "tsc",
            "--init",
            "--module",
            "esnext",
            "--moduleResolution",
            "node",
            "--resolveJsonModule",
            "--target",
            "es2017",
            "--noImplicitAny",
            "--sourceMap",
            "--lib",
            "dom,es2017",
            "--types",
            "node,jest",
            "--experimentalDecorators",
            "true",
            "--emitDecoratorMetadata",
            "true",
          ],
          {
            cwd: options.targetDirectory,
          }
        );
        if (result.failed) {
          throw new Error("Failed to create TS Config File");
        }
      } else {
        const result = await execa(
          "npx",
          [
            "tsc",
            "--init",
            "--module",
            "commonjs",
            "--moduleResolution",
            "node",
            "--resolveJsonModule",
            "--target",
            "es5",
            "--noImplicitAny",
            "--types",
            "node",
            "--experimentalDecorators",
            "true",
            "--emitDecoratorMetadata",
            "true",
          ],
          {
            cwd: options.targetDirectory,
          }
        );
        if (result.failed) {
          throw new Error("Failed to create TS Config File");
        }
      }
    },
  };

  const classValidator = taskListGenerator(
    "Class-validator",
    pkgList["class-validator"],
    true
  );
  const jestTask = taskListGenerator("Jest", pkgList["jest"], true);
  const testyTsTask = taskListGenerator("TestyTs", pkgList["testyts"], true);
  const jestHtmlReportersTask = taskListGenerator(
    "JestHTMLReporters",
    pkgList["jest-html-reporters"],
    true
  );
  const dotenvTask = taskListGenerator("Dotenv", pkgList["dotenv"], true);
  const tsJest = taskListGenerator("TS-Jest", pkgList["ts-jest"], true);
  const superTestTask = taskListGenerator(
    "SuperTest",
    pkgList["supertest"],
    true
  );
  const typescriptTask = taskListGenerator(
    "TypeScript Install",
    pkgList["typescript"],
    true
  );
  const typesTask = taskListGenerator("Types", pkgList["types"], true);
  const typeScriptMaster = taskListGenerator(
    "TypeScript",
    [typescriptTask, typeScriptInit, typesTask],
    true
  );

  if (testRunner === "Jest")
    return taskListGenerator(
      "Installing packages",
      [
        classValidator,
        jestTask,
        jestHtmlReportersTask,
        tsJest,
        superTestTask,
        dotenvTask,
        typeScriptMaster,
      ],
      true
    );
  else
    return taskListGenerator(
      "Installing packages",
      [
        classValidator,
        testyTsTask,
        superTestTask,
        dotenvTask,
        typeScriptMaster,
      ],
      true
    );
};

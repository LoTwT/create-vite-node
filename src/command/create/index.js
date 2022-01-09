import path from "path"
import chalk from "chalk"
import prompts from "prompts"
import { execa } from "execa"

import { toDirname, callWithErrorHandling } from "../../utils/index.js"
import {
  isDirEmpty,
  isExists,
  customizePkg,
  writeWithoutCheck,
  rmGit,
  emptyDir,
} from "../../utils/file.js"
import { isValidPackageName, toValidPackageName } from "../../utils/validate.js"

const WEB_TEMPLATES = [
  {
    name: "cms",
    repository: "https://github.com/LoTwT/vue3-template.git",
    branch: "cms",
  },
  {
    name: "pioneer",
    repository: "https://github.com/LoTwT/vue3-template.git",
    branch: "pioneer",
  },
]

const create = (inlineProjectName, { web }) =>
  callWithErrorHandling(async () => {
    let targetDir = inlineProjectName
    const defaultProjectName = targetDir
      ? targetDir
      : !web
      ? "vite-node"
      : "web-app"

    // if targetDir exists and is not empty, it will throw an Error and exit current process.
    const { packageName, webTemplate } = await prompts(
      [
        {
          type: targetDir ? null : "text",
          name: "projectName",
          message: "Project name",
          initial: defaultProjectName,
          onState: (state) =>
            (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          type: () =>
            isExists(targetDir) && !isDirEmpty(targetDir) ? "confirm" : null,
          name: "overwrite",
          message: () =>
            `${chalk.yellowBright(
              targetDir,
            )} exists and is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false)
              throw new Error(`${chalk.redBright("✖")} Create cancelled`)
            return null
          },
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : "text"),
          name: "packageName",
          message: "Valid package name",
          initial: () => toValidPackageName(targetDir),
          validate: (packageName) =>
            isValidPackageName(packageName) || "Invalid package name.",
          onState: (state) => (targetDir = state.value.trim()),
        },
        {
          type: () => (web ? "select" : null),
          name: "webTemplate",
          message: "Select a web template",
          choices: () =>
            WEB_TEMPLATES.map((t) => ({
              title: t.name,
              value: t,
            })),
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${chalk.redBright("✖")} Create cancelled`)
        },
      },
    )

    const cwd = process.cwd()
    // target working directory
    const twd = path.resolve(cwd, targetDir)

    console.log(
      `\n${chalk.blue(`Scaffolding project in ${chalk.yellowBright(cwd)} .`)}`,
    )

    if (!web) {
      createViteNode(twd, targetDir, packageName)
    } else {
      await createWebTemplate(twd, webTemplate)
    }

    customizePkg(path.resolve(twd, "package.json"), packageName || targetDir)

    console.log(`\n${chalk.green("Down. Please run: ")}\n`)
    console.log(`  ${chalk.cyanBright(`cd ${targetDir}`)}`)
    console.log(`  ${chalk.cyanBright(`npm install`)}`)
    console.log(`  ${chalk.cyanBright(`npm run dev`)}\n`)
  })

const createViteNode = (twd) => {
  const templatePath = path.resolve(
    toDirname(import.meta.url),
    "../../../templates/vite-node",
  )

  writeWithoutCheck(templatePath, twd)
}

const createWebTemplate = async (twd, webTemplate) => {
  if (!webTemplate) throw new Error("invalid web template")

  const { repository, branch } = webTemplate
  emptyDir(twd)
  await execa("git clone", [repository, twd, branch && `--branch=${branch}`], {
    stdio: "inherit",
  })

  rmGit(twd)
}

export default {
  command: "create [projectName]",
  option: "-w, --web",
  description: "create vite node template",
  action: create,
}

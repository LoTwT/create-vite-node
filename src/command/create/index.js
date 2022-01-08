import fs from "fs"
import path from "path"
import chalk from "chalk"
import prompts from "prompts"

import { toDirname, callWithErrorHandling } from "../../utils/index.js"
import {
  recursiveWrite,
  isDirEmpty,
  isExists,
  customizePkg,
  writeWithoutCheck,
} from "../../utils/file.js"
import { isValidPackageName, toValidPackageName } from "../../utils/validate.js"

const create = (inlineProjectName) =>
  callWithErrorHandling(async () => {
    let targetDir = inlineProjectName
    const defaultProjectName = targetDir ? targetDir : "vite-node"

    // if targetDir exists and is not empty, it will throw an Error and exit current process.
    const { packageName } = await prompts([
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
    ])

    const cwd = process.cwd()
    // target working directory
    const twd = path.resolve(cwd, targetDir)

    const templatePath = path.resolve(
      toDirname(import.meta.url),
      "../../../templates/vite-node",
    )

    console.log(
      `\n${chalk.blue(
        `Scaffolding project in ${chalk.yellowBright(cwd)} .`,
      )}\n`,
    )

    writeWithoutCheck(templatePath, twd)
    customizePkg(path.resolve(twd, "package.json"), packageName || targetDir)

    console.log(`${chalk.green("Down. Please run: ")}\n`)
    console.log(`  ${chalk.cyanBright(`cd ${targetDir}`)}`)
    console.log(`  ${chalk.cyanBright(`npm install`)}`)
    console.log(`  ${chalk.cyanBright(`npm run dev`)}\n`)
  })

export default {
  command: "create [projectName]",
  description: "create vite node template",
  action: create,
}

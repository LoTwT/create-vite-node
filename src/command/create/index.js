import fs from "fs"
import path from "path"
import chalk from "chalk"

import { toDirname } from "../../utils/index.js"
import { recursiveWrite } from "../../utils/file.js"

export default {
  command: "create <projectName>",
  description: "create vite node template",
  action: (projectName) => {
    // 已存在同名文件夹
    if (fs.existsSync(projectName)) {
      console.log(
        `${chalk.redBright(
          "It has a folder of the same name!",
        )} ${chalk.cyanBright("Please change a project name.")}`,
      )
    } else {
      console.log(
        `\n${chalk.blue(`Scaffolding project in ${process.cwd()}...`)}\n`,
      )

      // 写入 template
      // 创建项目文件夹
      fs.mkdirSync(projectName)

      const templatePath = path.resolve(
        toDirname(import.meta.url),
        "../../../templates/vite-node",
      )

      // 递归写入
      recursiveWrite(templatePath, projectName)

      console.log(`${chalk.green("Down. Please run: ")}\n`)
      console.log(`  ${chalk.cyanBright(`cd ${projectName}`)}`)
      console.log(`  ${chalk.cyanBright(`npm install`)}`)
      console.log(`  ${chalk.cyanBright(`npm run dev`)}\n`)
    }
  },
}

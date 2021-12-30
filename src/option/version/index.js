import fs from "fs"
import path from "path"
import chalk from "chalk"

import { getCurrPath } from "../../utils/index.js"

export default {
  option: "-v, --version",
  description: "current version",
  action: () => {
    const currPath = getCurrPath(import.meta.url)
    const packageJson = JSON.parse(
      fs
        .readFileSync(path.resolve(currPath, "../../../../package.json"))
        .toString(),
    )
    console.log(
      `${chalk.blueBright("create-vite-node")}: ${chalk.cyanBright(
        packageJson.version,
      )}`,
    )
  },
}

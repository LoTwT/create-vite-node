import fs from "fs"
import path from "path"
import chalk from "chalk"

import { toDirname } from "../../utils/index.js"

export default {
  option: "-v, --version",
  description: "current version",
  action: () => {
    const _dirname = toDirname(import.meta.url)
    const packageJson = JSON.parse(
      fs
        .readFileSync(path.resolve(_dirname, "../../../package.json"))
        .toString(),
    )
    console.log(
      `${chalk.blueBright("create-vite-node")} ${chalk.cyanBright(
        packageJson.version,
      )}`,
    )
  },
}

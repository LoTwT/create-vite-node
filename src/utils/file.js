import fs from "fs"
import path from "path"

/**
 * 递归写入
 * @param {string} srcDir 原路径
 * @param {string} destDir 目标路径
 */
export const recursiveWrite = (srcDir, destDir) => {
  const srcs = fs.readdirSync(srcDir)

  srcs.forEach((src) => {
    const srcPath = path.resolve(srcDir, src)
    const destPath = path.resolve(destDir, src)

    const stat = fs.statSync(srcPath)

    if (stat.isDirectory()) {
      fs.mkdirSync(destPath)
      recursiveWrite(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

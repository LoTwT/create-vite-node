import fs from "fs"
import path from "path"

/**
 * @param {string} srcDir source path (origin path)
 * @param {string} destDir destination path
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

export const writeWithoutCheck = (srcDir, destDir) => {
  isExists(destDir) && emptyDir(destDir)
  fs.mkdirSync(destDir)
  recursiveWrite(srcDir, destDir)
}

export const emptyDir = (dirpath) =>
  isExists(dirpath) && fs.rmSync(dirpath, { recursive: true })

export const isDirEmpty = (dirpath) => fs.readdirSync(dirpath).length === 0

export const isExists = (path) => fs.existsSync(path)

export const customizePkg = (pkgPath, pkgName) => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString())
  pkgName && (pkg.name = pkgName)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
}

export const rmGit = (dirpath) => {
  const gitpath = path.resolve(dirpath, ".git")
  isExists(gitpath) && fs.rmSync(gitpath, { recursive: true })
}

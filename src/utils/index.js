import { fileURLToPath } from "url"
import { dirname } from "path"

// esm transform __dirname
export const toDirname = (importMetaUrl) =>
  dirname(fileURLToPath(importMetaUrl))

/**
 * call function with error handling
 * @param { Function } fn
 * @param { Function } errorCallback
 */
export const callWithErrorHandling = async (fn, errorCallback = null) => {
  try {
    if (typeof fn !== "function") throw new TypeError("invalid function")
    await fn()
  } catch (error) {
    typeof errorCallback === "function" && (await errorCallback())
    console.error(error.message || error)
    process.exit()
  }
}

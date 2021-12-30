import { program } from "commander"
import Options from "./option/index.js"
import Commands from "./command/index.js"

export const init = () => {
  registerOption(Options)
  registerCommand(Commands)
  program.parse()
}

const registerOption = (options) => {
  options.forEach((o) => {
    const { option, description, action } = o
    program.option(option, description).action(action)
  })
}

const registerCommand = (commands) => {
  commands.forEach((c) => {
    const { command, description, action } = c
    program.command(command).description(description).action(action)
  })
}

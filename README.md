# create-vite-node

A simple cli to create node template using [Vite](https://github.com/vitejs/vite), [vite-plugin-node](https://github.com/axe-me/vite-plugin-node), [Vitest](https://github.com/vitest-dev/vitest).

> it's just for study and for fun now...

## Feature

- all vite can do :laughing:
- custom project template (by me)
  - vite-node
  - web
    1. `vue3-cms`
    1. `pioneer`: vue3 + vite + ts + ant-design-vue + vitest
    1. `pioneer-complete`: pioneer + vue-router + pinia

## scripts

- install

  ```shell
  npm i create-vite-node -g
  pnpm add create-vite-node -g
  ```

- use

  ```shell
  # create-vite-node alias => cvn
  cvn create [projectName] [options]
  ```

### options

- create:
  - `-w, --web`: create web template

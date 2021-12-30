import Koa from "koa"

const app = new Koa()

app.use((ctx) => {
  if (ctx.url === "/") {
    ctx.body = "homepage"
  } else {
    ctx.body = "other page"
  }
})

export const viteNodeApp = app

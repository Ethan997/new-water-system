// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
const router = require("koa-router")();
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 获取POST请求的入参
app.use(bodyParser());

// 解决跨域
app.use(
  cors({
    origin: function(ctx) {
      console.log("ctx.url", ctx.url);
      if (ctx.url === "/test") {
        return "*"; // 允许来自所有域名请求
      }
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

// 登录
router.post("/koa/login", async (ctx, next) => {
  const postParam = ctx.request.body;

  if (JSON.stringify(postParam) !== "{}") {
    ctx.response.type = "json";
    ctx.response.body = { data: "login success", success: true };
  } else {
    ctx.response.type = "json";
    ctx.response.body = { data: "login success", success: false };
    await next();
  }
});

// 申请送水
router.post("/koa/apply", async (ctx, next) => {
  const postParam = ctx.request.body;

  if (JSON.stringify(postParam) !== "{}") {
    ctx.response.type = "json";
    ctx.response.body = { data: "apply success", success: true };
  } else {
    ctx.response.type = "json";
    ctx.response.body = { data: "apply success", success: false };
    await next();
  }
});

app.use(router.routes()).use(router.allowedMethods());

// 在端口3001监听:
app.listen(3001);
console.log("serve started ...");

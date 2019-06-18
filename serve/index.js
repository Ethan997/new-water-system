// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
const router = require("koa-router")();
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const sequelize = require("./database");
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
  console.log("准备验证登录");
  let status = false;
  if (JSON.stringify(postParam) !== "{}") {
    this.sequelize = sequelize;

    await this.sequelize
      .query(`select * from users WHERE sid=${postParam.username}`, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(function(user) {
        //返回所有查询结果
        if (user.length < 1) {
          return;
        }
        const sid = Number(user[0].sid);
        const password = user[0].password.toString();
        status = sid == postParam.username && password == postParam.password;
        if (status == true) {
          ctx.response.type = "json";
          ctx.response.body = { data: "login success", success: true };
        } else {
          ctx.response.type = "json";
          ctx.response.body = { data: "login false", success: false };
        }
      });
  }

  if (status == true) {
    ctx.response.type = "json";
    ctx.response.body = { data: "login success", success: true };
  } else {
    ctx.response.type = "json";
    ctx.response.body = { data: "login false", success: false };
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

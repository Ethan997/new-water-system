// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
const router = require("koa-router")();
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const { sequelize, Orders } = require("./database");
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
  let status = false;
  if (JSON.stringify(postParam) !== "{}") {
    await sequelize
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
  // 获取请求入参
  const postParam = ctx.request.body;
  console.log("postParam", postParam);
  if (JSON.stringify(postParam) !== "{}") {
    // 插入数据
    Orders.create(postParam);
    ctx.response.type = "json";
    ctx.response.body = { data: "apply success", success: true };
  } else {
    ctx.response.type = "json";
    ctx.response.body = { data: "apply success", success: false };
    await next();
  }
});

// 获取表格数据
router.post("/koa/getSource", async (ctx, next) => {
  let orders = [];
  // 获取请求入参
  const postParam = ctx.request.body;
  console.log('foreach',postParam)
  const sqlSearch =`select * from orders where status = ${postParam.orderState}`;
  await sequelize
    .query(sqlSearch, { type: sequelize.QueryTypes.SELECT })
    .then(function(data) {
      orders = data;
    });
 
  if (JSON.stringify(postParam) !== "{}") {
    ctx.response.type = "json";
    ctx.response.body = { data: orders, success: true };
  } else {
    ctx.response.type = "json";
    ctx.response.body = { data: orders, success: false };
    await next();
  }
});

// 修改表格数据
router.post("/koa/setSource", async (ctx, next) => {
  // 获取请求入参
  const postParam = ctx.request.body;
  console.log('foreach',postParam)
  postParam.forEach((item) => {
    Orders.update(
      {
        status: true
      },
      {
        where: {
          sid: Number(item) 
        }
      }
    ).then(function(result) {
      console.log("updated user");
      console.log(result);
    });
  })
  if (JSON.stringify(postParam) !== "{}") {
    ctx.response.type = "json";
    ctx.response.body = { data: "updated success", success: true };
  } else {
    ctx.response.type = "json";
    ctx.response.body = { data: "updated success", success: false };
    await next();
  }
});

app.use(router.routes()).use(router.allowedMethods());

// 在端口3001监听:
app.listen(3001);
console.log("serve started ...");

import getSession from "next-session";

// グローバル変数としてセッションインスタンスを保持
let sessionInstance;
if (global.sessionInstance) {
  sessionInstance = global.sessionInstance;
} else {
  sessionInstance = getSession({
    secret: "your-very-secret-string",
    cookie: {
      secure: false,
    }
  });
  global.sessionInstance = sessionInstance;
}

// セッションラッパー関数
export function withSession(handler) {
  return async (req, res) => {
    req.session = await sessionInstance(req, res);
    return handler(req, res);
  };
}
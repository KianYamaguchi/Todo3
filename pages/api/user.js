import mysql from "mysql2/promise";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { withSession } from "./setting"; // セッションラッパーをインポート

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todo3",
});

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { action, username, email, password } = req.body;

      if (action === "register") {
        // ユーザー登録処理
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
          "INSERT INTO users (userid, username, email, password) VALUES (?, ?, ?, ?)",
          [uuid(), username, email, hashedPassword]
        );
        res.status(201).json({ message: "User created" });
      } else if (action === "login") {
        // ログイン処理
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) {
          res.status(401).json({ message: "Invalid username or password" });
          return;
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }

        req.session.userId = user.userid;
        console.log("session:", req.session);

        res.status(200).json({ message: "Login successful", user: { userid: user.userid, username: user.username, email: user.email } });
      } else {
        res.status(400).json({ message: "Invalid action" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error(err); // サーバーのコンソールにエラー内容を出力
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

// next-sessionでラップしてexport
export default withSession(handler);
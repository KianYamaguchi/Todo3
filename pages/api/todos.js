import mysql from "mysql2/promise";
const { v4: uuid } = require("uuid");
import { withSession } from "./setting"; // セッションラッパーをインポート

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todo3",
});

async function handler(req, res) {
  const userId = req.session.userId; // セッションからユーザーIDを取得
  console.log("ここ", userId);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const [rows] = await db.execute("SELECT * FROM todos WHERE userid = ?", [userId]);
    res.status(200).json(rows);
  } else if (req.method === "POST") {
    const { action, text, date, id } = req.body;

    if (action === "logout") {
      req.session.destroy();
      res.status(200).json({ message: "Logged out successfully" });
      return;
    }

    if (text) {
      const newId = uuid();
      await db.execute(
        "INSERT INTO todos (id, text, date, userid) VALUES (?, ?, ?, ?)",
        [newId, text, date, userId]
      );
      res.status(201).json({ id: newId, text, date });
      return;
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await db.execute("DELETE FROM todos WHERE id = ?", [id]);
    res.status(200).json({ message: "Todo deleted" });
  } else if (req.method === "PUT") {
    const { id, text, date } = req.body;
    await db.execute("UPDATE todos SET text = ?, date = ? WHERE id = ?", [text, date, id]);
    res.status(200).json({ message: "Todo updated" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// withSessionでラップしてexport
export default withSession(handler);
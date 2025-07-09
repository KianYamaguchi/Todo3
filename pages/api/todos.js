import mysql from "mysql2/promise"; // MySQLのPromiseベースのクライアント
const { v4: uuid } = require("uuid"); // UUIDを生成するためのライブラリ

const db = mysql.createPool({
  host: "localhost", // MySQLサーバーのホスト名
  user: "root",      // MySQLのユーザー名
  password: "root", // MySQLのパスワード
  database: "todo3",  // 使用するデータベース名
});


export default async function handler(req, res) {
  if (req.method === "GET") {
    // Todoリストを取得
    const [rows] = await db.execute("SELECT * FROM todos");
    res.status(200).json(rows);
  } else if (req.method === "POST") {
    // 新しいTodoを追加
    const { text, date } = req.body;
    const id = uuid(); // UUIDを生成
    await db.execute("INSERT INTO todos (id, text, date) VALUES (?, ?, ?)", [id, text, date]);
    res.status(201).json({ id, text, date });
  } else if (req.method === "DELETE") {
    // Todoを削除
    const { id } = req.body;
    await db.execute("DELETE FROM todos WHERE id = ?", [id]);
    res.status(200).json({ message: "Todo deleted" });
  } else if (req.method === "PUT") {
    // Todoを更新
    const { id, text, date } = req.body;
    await db.execute("UPDATE todos SET text = ?, date = ? WHERE id = ?", [text, date, id]);
    res.status(200).json({ message: "Todo updated" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
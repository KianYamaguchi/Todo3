import { useRouter } from "next/router";
import { useRef } from "react";
import styled from "../../components/details.module.css";

export default function Details() {
  const router = useRouter();
  const { id, text, date } = router.query; // クエリパラメータからデータを取得
  const inputRef = useRef(null); // 入力フィールドを参照するためのuseRef
  const inputDateRef = useRef(null); // 日付入力フィールドを参照するためのuseRef

  const handleDelete = async () => {
    try {
      // APIに削除リクエストを送信
      const response = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // IDを送信
      });

      if (response.ok) {
        // リストページに戻る
        router.push("/");
      } else {
        console.error("Failed to delete Todo");
      }
    } catch (error) {
      console.error("Error deleting Todo:", error);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
    const updatedText = inputRef.current.value.trim(); // 入力フィールドの値を取得
    const updatedDate = inputDateRef.current.value; // 日付入力フィールドの値を取得

    if (updatedText) {
      try {
        // APIに更新リクエストを送信
        const response = await fetch("/api/todos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, text: updatedText , date: updatedDate }), // IDと新しいテキストを送信
        });

        if (response.ok) {
          // リストページに戻る
          router.push("/");
        } else {
          console.error("Failed to update Todo");
        }
      } catch (error) {
        console.error("Error updating Todo:", error);
      }
    }
  };
  

 return (
    <div className={styled.container}>
      <header className={styled.header}>
        <h1>Todo Details</h1>
      </header>
      <div className={styled.details}>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Text:</strong> {text}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
      <button onClick={() => router.push("/")} className={styled.button}>
        Back to List
      </button>
      <button onClick={handleDelete} className={`${styled.button} ${styled.red}`} style={{ marginLeft: "10px" }}>
        Delete Todo
      </button>
      <h3>Edit Todo</h3>
      <form onSubmit={handleEdit} className={styled.form}>
        <input type="text" defaultValue={text} ref={inputRef} className={styled.input} />
        <input type="date" defaultValue={date} ref={inputDateRef} className={styled.dateInput} />
        <button type="submit" className={styled.button}>Save</button>
      </form>
    </div>
  );
}
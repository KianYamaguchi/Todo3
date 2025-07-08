import { useRouter } from "next/router";

export default function Details() {
  const router = useRouter();
  const { id, text, completed } = router.query; // クエリパラメータからデータを取得

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo Details</h1>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Text:</strong> {text}</p>
      <button onClick={() => router.push("/")}>Back to List</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
        Delete Todo
      </button>
    </div>
  );
}
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import style from "../components/index.module.css";

export default function Home() {
  const [todos, setTodos] = useState([]); // Todoリストの状態
  const inputRef = useRef(null); // 入力フィールドを参照するためのuseRef

  // APIからTodoリストを取得
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // 新しいTodoを追加する関数
  const handleAddTodo = async (e) => {
    e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
    const newTodoText = inputRef.current.value.trim(); // 入力フィールドの値を取得
    if (newTodoText) {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodoText }),
      });
      const newTodoItem = await response.json();
      setTodos([...todos, newTodoItem]); // 状態を更新
      inputRef.current.value = ""; // フォームをクリア
    }
  };

  return (
    <div className={style.container}>
      <Layout>
        <header className={style.header}>
          <h2>Todo List</h2>
        </header>
        <form onSubmit={handleAddTodo} className={style.form}>
          <input
            type="text"
            placeholder="新しいtodoを入力"
            ref={inputRef}
            className={style.input}
          />
          <button type="submit" className={style.button}>
            追加
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={style.todoItem}>
              <Link
                href={{
                  pathname: "/posts/details",
                  query: { id: todo.id, text: todo.text },
                }}
              >
                {todo.text}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
}

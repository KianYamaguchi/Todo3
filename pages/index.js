import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  const [todos, setTodos] = useState([]);// Todoリストの状態
  const [newTodo, setNewTodo] = useState("");// 新しいTodoの状態

  
  // APIからTodoリストを取得　ページ遷移時に再取得
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []); 

  // 新しいTodoを追加する関数
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodo }),
      });
      const newTodoItem = await response.json();
      setTodos([...todos, newTodoItem]); // 状態を更新
      setNewTodo(""); // 入力フィールドをクリア
    }
  };

  return (
    <Layout>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="新しいtodoを入力"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}// 入力フィールドの値を状態に反映
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
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
  );
}

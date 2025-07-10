import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Login() {

    const inputUserRef = useRef(null); // ユーザー名入力フィールドを参照するためのuseRef
    const inputPasswordRef = useRef(null); // パスワード入力フィールドを参照するためのuseRef
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
          const userName = inputUserRef.current.value;
        const password = inputPasswordRef.current.value;
        if (userName && password) {
            // ここでAPIにリクエストを送信するなどの処理を行う
            const response = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "login", username: userName, password: password }),
            });
               if (response.ok) {
                  router.push("/");
            } else {
                 alert("ログインに失敗しました。もう一度お試しください。");
            }
        }
    }

    return (
        <div>
            <h2>ログインフォーム</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">ユーザー名:</label>
                    <input type="text" id="username" name="username" required ref={inputUserRef} />
                </div>
                <div>
                    <label htmlFor="password">パスワード:</label>
                    <input type="password" id="password" name="password" required ref={inputPasswordRef} />
                </div>
                <button type="submit">ログイン</button>
                <p>
                    <Link href="register">アカウントをお持ちでない方はこちら</Link>
                </p>
            </form>
        </div>
    )
}

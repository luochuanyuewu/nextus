"use client";
import Link from "next/link";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getStrapiURL } from "@/app/[lang]/utils/api-helpers";


const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;


export default function FormLogin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // 防止表单重复 提交
    const [submitting, setSubmitting] = useState(false);


    const handleLogin = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setSubmitting(true);
            if (email === "" || password === "") {
                // showToast("请输入邮箱密码");
                setSubmitting(false)
                return
            }

            const res: any = await fetch(getStrapiURL() + "/api/auth/local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ identifier: email.trim(), password: password }),
            })

            console.log('User profile', res.data.user);
            console.log('User token', res.data.jwt);
            setSubmitting(false);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="card card-bordered flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title mx-auto" >登录</h2>
                <div className="divider"></div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">邮箱</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">密码</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">忘记密码?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={handleLogin} >邮箱登录</button>
                </div>
                <div className="form-control mt-6">
                    <Link data-umami-event="auth-login-github" href={`${backendUrl}/api/connect/github`}>
                        <button className="btn btn-secondary" >Github登录</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

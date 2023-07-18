"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from "next/navigation";

const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const LoginRedirect = (props: any) => {
    const [text, setText] = useState('Loading...');
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {

        if (!searchParams.has("access_token")) {
            setText("无效的请求")
            return
        }

        // Successfully logged with the provider
        // Now logging with strapi by using the access_token (given by the provider) in props.location.search
        fetch(`${backendUrl}/api/auth/${params.provider}/callback?access_token=${searchParams.get("access_token")}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
                }
                return res;
            })
            .then(res => res.json())
            .then(res => {
                // Successfully logged with Strapi
                // Now saving the jwt to use it for future authenticated requests to Strapi
                localStorage.setItem('jwt', res.jwt);
                localStorage.setItem('username', res.user.username);
                setText('您已经成功登录， 你会在几秒内重定向到主页...');
                setTimeout(() => router.push('/'), 3000); // Redirect to homepage after 3 sec
            })
            .catch(err => {
                console.log(err);
                setText('An error occurred, please see the developer console.')
            });
    }, [router, searchParams, params.provider]);

    return <p>{text}</p>
};

export default LoginRedirect;
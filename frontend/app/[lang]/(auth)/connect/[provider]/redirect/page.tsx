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
            setText(searchParams.get("error") + searchParams.get("error_description") + searchParams.get("error_url"))
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
                setText('You have been successfully logged in. You will be redirected in a few seconds...');
                setTimeout(() => router.push('/'), 8000); // Redirect to homepage after 3 sec
            })
            .catch(err => {
                console.log(err);
                setText('An error occurred, please see the developer console.')
            });
    }, [router, searchParams, params.provider]);

    return <p>{text}</p>
};

export default LoginRedirect;
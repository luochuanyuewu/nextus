
'use client';

import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";


interface CommentBody {
    author?: {
        id?: string
        name: string
        email: string
        avatar?: string
    }
    content: string
    threadOf?: number
}

interface CommentBoxProps {
    collectionNmae: string;
    contentTypeName: string;
    entityId: number
    placeHolder?: string
    label?: string
    buttonText?: string
}


export default function CommentBox({ collectionNmae, contentTypeName, entityId, placeHolder = '发布评论...', label = 'Your comment', buttonText = 'Post comment' }: CommentBoxProps) {


    const [email, setEmail] = useState("");
    const [nickName, setNickname] = useState("");
    const [content, setContent] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function handleSubmit() {
        if (email === "") {
            setErrorMessage("Email cannot be blank.");
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("Invalid email format.");
            return;
        }

        if (nickName === "") {
            setErrorMessage("Nickname cannot be blank.");
        }

        const commentBody: CommentBody = {
            author: {
                id: 'guest',
                name: nickName,
                email: email
            },
            content: content
        }

        const res = await fetch(getStrapiURL() + `/api/comments/api::${collectionNmae}.{contentTypeName}:${entityId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: commentBody }),
        });

        if (!res.ok) {
            setErrorMessage("Email failed to submit.");
            return;
        }
        setErrorMessage("");
        setSuccessMessage("Email successfully submitted!");
        setEmail("");
    }

    return (
        <div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
                <textarea className="textarea textarea-bordered  h-24" placeholder={placeHolder}></textarea>
                <button
                    type="submit"
                    className="btn btn-outline btn-sm btn-wide my-2"
                >
                    {buttonText}
                </button>
            </div>

            <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                        {label}
                    </label>
                    <textarea
                        id="comment"
                        rows={6}
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder={placeHolder}
                        required
                        defaultValue={""}
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                    {buttonText}
                </button>
            </form>
        </div>

    )
}
'use client'
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";


interface CommentAuthor {
    id: string
    name: string
    email: string
    avatar?: string
}

interface Comment {
    id: number
    content: string
    author: CommentAuthor
    children: Array<Comment>
}

export default function CommentList({
    data: comments,
}: {
    data: Comment[];
    children?: React.ReactNode;
}) {
    return (
        <section className="">
            <div className="grid grid-cols-1 gap-6 ">
                {comments.map((comment) => {
                    return (
                        <article key={comment.id} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                        {comment.author.avatar && <Image
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={comment.author.avatar}
                                            alt={comment.author.name}
                                        />}
                                        {comment.author.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <time dateTime="2022-02-08" title="February 8th, 2022">
                                            Feb. 8, 2022
                                        </time>
                                    </p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">
                                {comment.content}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                                <button
                                    type="button"
                                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="mr-1 w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    Reply
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}



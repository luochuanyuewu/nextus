import React from 'react';
import directusApi from "@/app/[lang]/utils/directus-api";
import {readItems} from "@directus/sdk";
import {getDirectusMedia} from "@/app/[lang]/utils/api-helpers";
import TypographyTitle from "@/app/[lang]/components/typography/TypographyTitle";
import TypographyHeadline from "@/app/[lang]/components/typography/TypographyHeadline";
import Link from "next/link";
import PageContainer from "@/app/[lang]/components/PageContainer";
import {Project} from "@/types/schemas";


type Props = {
    params: { slug: string; lang: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PageRoute({params}: Props) {

    const projects = await directusApi.request(readItems('projects', {
        filter: {
            // status: { _eq: 'published' },
        },
        fields: [],
    }));

    function isEven(n: number) {
        return n % 2 === 0;
    }

    return (
        <PageContainer>
            <header className="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
                <TypographyTitle>Agency Projects</TypographyTitle>
                <TypographyHeadline
                    content="<p>We kill it for you <em>(our clients)</em>.</p>"
                />
            </header>
            <section className="relative items-center w-full py-12">
                <TypographyTitle>Latest Projects</TypographyTitle>
                <div className="grid gap-6 mt-4 md:grid-cols-3">
                    {(projects as any).map((project: Project, projectIdx: number) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className={[
                                isEven(projectIdx)
                                    ? 'rounded-br-3xl rounded-tl-3xl'
                                    : 'rounded-bl-3xl rounded-tr-3xl',
                                'block relative w-full mb-6 overflow-hidden border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition duration-300 p-2',
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    isEven(projectIdx)
                                        ? 'rounded-br-2xl rounded-tl-2xl'
                                        : 'rounded-bl-2xl rounded-tr-2xl',
                                    'relative group overflow-hidden h-56',
                                ].join(' ')}
                            >
                                <img
                                    src={getDirectusMedia(project.image) as any}
                                    className="object-cover transition duration-300 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75">
                                    <div className="p-8">
                                        <TypographyTitle>{project.client}</TypographyTitle>
                                        <TypographyHeadline content={project.title}/>
                                        <div className="mt-2">
                                            {/*{project.built_with.map((item, itemIdx) => (*/}
                                            {/*    <VBadge*/}
                                            {/*        key={itemIdx}*/}
                                            {/*        className="mb-2 mr-2"*/}
                                            {/*        size="lg"*/}
                                            {/*        color="#0f172a"*/}
                                            {/*    >*/}
                                            {/*        {item}*/}
                                            {/*    </VBadge>*/}
                                            {/*))}*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
}


import React from 'react';
import {getDirectusMedia} from "@/app/[lang]/utils/api-helpers";
import TypographyHeadline from "@/app/[lang]/components/typography/TypographyHeadline";
import PageContainer from "@/app/[lang]/components/PageContainer";
import TypographyProse from "@/app/[lang]/components/typography/TypographyProse";
import TypographyTitle from "@/app/[lang]/components/typography/TypographyTitle";
import directusApi from "@/app/[lang]/utils/directus-api";
import {readItems} from "@directus/sdk";
import {Project} from "@/types/schemas";
import GalleryBlock from "@/app/[lang]/components/blocks/GalleryBlock";


export default async function PageRoute({params}: { params: any }) {

    const projects = await directusApi.request(readItems('projects', {
        filter: {slug: {_eq: params.slug}},
        limit: 1,
        // @ts-ignore
        fields: ['*', "gallery.directus_files_id.*"],
    }));

    if (projects.length === 0) return null

    const project = projects[0] as Project

    return (
        <div className="py-12">
            <div
                className="relative h-[400px] overflow-hidden flex justify-center items-center rounded-tr-[48px] rounded-bl-[48px]">
                <img
                    className="absolute inset-0 object-cover w-full h-full"
                    src={getDirectusMedia(project.image) || ''}
                />
                <div className="absolute inset-0 bg-gray-900 opacity-75"/>
                <div
                    className="relative max-w-3xl p-8 mx-auto overflow-hidden bg-gray-900 bg-opacity-50 rounded-tr-3xl rounded-bl-3xl">
                    <TypographyHeadline
                        content={project.title}
                        className="text-white"
                        size="xl"
                    />
                    <p className="mt-4 font-mono font-semibold text-gray-300 md:text-lg font-display">
                        {project.summary}
                    </p>
                </div>
            </div>
            <main className="relative">
                <PageContainer className="max-w-6xl mx-auto md:flex">
                    <main className="p-4">
                        <article className="w-full">
                            {/* Main */}
                            <TypographyProse content={project.content}/>
                        </article>

                        {project.gallery && project.gallery.length > 0 && (
                            <GalleryBlock
                                className="mt-8 overflow-hidden bg-white dark:bg-gray-800 rounded-tr-3xl rounded-bl-3xl"
                                data={{
                                    id: project.id,
                                    title: 'Gallery',
                                    gallery_items: project.gallery,
                                }}
                            />
                        )}
                    </main>
                    <aside className="">
                        <div
                            className="space-y-8 md:w-[300px] flex-shrink-0 p-4 border-2 dark:border-gray-700 rounded-tr-2xl rounded-bl-2xl">
                            <div>
                                <TypographyTitle>Client</TypographyTitle>
                                <p className="font-mono font-bold dark:text-white">
                                    {project.client}
                                </p>
                            </div>
                            <div>
                                <TypographyTitle>Built With</TypographyTitle>
                                {project.built_with && project.built_with.map((item, itemIdx) => (
                                    <div className="mt-2" key={itemIdx}>
                                        {/*<VBadge size="lg" color="#0f172a">*/}
                                        {/*    {item}*/}
                                        {/*</VBadge>*/}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <TypographyTitle>Cost</TypographyTitle>
                                <p className="font-mono font-bold dark:text-white">
                                    {project.cost}
                                </p>
                            </div>
                        </div>
                    </aside>
                </PageContainer>
            </main>
        </div>
    );
}


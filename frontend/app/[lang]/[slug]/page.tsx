import { title } from 'process';
import { fetchAPI } from '../utils/fetch-api';
import { sectionRenderer } from '../utils/section-renderer';
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string, lang: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await getPageBySlug(params.slug, params.lang);

    const { metadata } = page.data[0].attributes;

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    };
}



export default async function PageRoute({ params }: Props) {

    const page = await getPageBySlug(params.slug, params.lang);
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) => sectionRenderer(section, index));
}

export async function generateStaticParams({ params }: { params: { lang: string } }) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/pages`;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const pageResponse = await fetchAPI(
        path,
        {
            locale: params.lang
        },
        options
    );


    pageResponse.data.map(
        (page: any
        ) => {
            console.log("generating page route:" + JSON.stringify(page.attributes.slug) + `for locale:${params.lang}`)
        }
    );

    return pageResponse.data.map(
        (page: {
            attributes: {
                slug: string;
            };
        }) => ({ slug: page.attributes.slug })
    );
}

import { fetchAPI } from '../utils/fetch-api';
import { sectionRenderer } from '../utils/section-renderer';

async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

export default async function PageRoute({ params }: { params: { slug: string, lang: string } }) {

    const page = await getPageBySlug(params.slug, params.lang);
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) => sectionRenderer(section, index));
}

export async function generateStaticParams() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/pages`;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const pageResponse = await fetchAPI(
        path,
        {
        },
        options
    );
    console.log("PageResponse:" + JSON.stringify(pageResponse))

    return pageResponse.data.map(
        (page: {
            attributes: {
                slug: string;
            };
        }) => ({ slug: page.attributes.slug })
    );
}

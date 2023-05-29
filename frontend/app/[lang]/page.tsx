import LangRedirect from './components/LangRedirect';
import { fetchAPI } from './utils/fetch-api';
import { sectionRenderer } from './utils/section-renderer';
import { i18n } from "i18n-config";
async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

export default async function RootRoute({ params }: { params: { lang: string } }) {
    const page = await getPageBySlug('me', params.lang);
    if (page.data.length == 0 && params.lang !== i18n.defaultLocale) return <LangRedirect />
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) => sectionRenderer(section, index));
}

import { fetchAPI } from '../../utils/fetch-api';


async function getCourseBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/courses`;

    const urlParamsObject = {
        filters: { slug },
        locale: lang,
        populate: {
            lessons: '*'
        }
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}


export default async function ViewCourse({ params }: { params: { lang: string, slug: string } }) {
    // const [lessonProgress, setLessonProgress] = useState(completedLessons)

    const response = await getCourseBySlug(params.slug, params.lang);

    if (response.data.length === 0) return null;

    const course = response.data[0];

    const lessons = course.attributes.lessons.data;

    return (
        <>
            <p>{JSON.stringify(course)}</p>
            {/* <CourseViewer course={course} /> */}
        </>
    )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const session = await unstable_getServerSession(context.req, context.res, authOptions)

//     const id = context?.query?.slug?.[0]
//     if (typeof id !== "string") { throw new Error('missing id') };

//     const course = await prisma.course.findUnique({
//         where: { id: parseInt(id) },
//         include: {
//             lessons: {
//                 include: {
//                     video: true
//                 }
//             }
//         },
//     })

//     if (!course) {
//         return { notFound: true }
//     }

//     if (course.published === false && course.authorId !== session?.user?.id) {
//         return { notFound: true }
//     }

//     const completedLessons = await prisma.userLessonProgress.findMany({
//         where: {
//             userId: session?.user?.id,
//             lessonId: {
//                 in: course.lessons.map(lesson => lesson.id)
//             }
//         }
//     }).then(progress => progress.map(p => p.lessonId))

//     course.lessons = await Promise.all(course.lessons.map(async (lesson) => {
//         if (lesson?.video?.publicPlaybackId) {
//             const { blurHashBase64 } = await muxBlurHash(lesson.video.publicPlaybackId);
//             (lesson.video as VideoWithPlaceholder).placeholder = blurHashBase64;
//         }
//         return lesson
//     }))

//     return {
//         props: {
//             session,
//             course,
//             completedLessons
//         },
//     }
// }

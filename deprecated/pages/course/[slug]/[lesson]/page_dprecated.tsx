// import CourseViewer from '@/components/course/CourseViewer';
import { fetchAPI } from '@/deprecated/lib/strapi-helpers'
import clsx from 'clsx'
import { Player } from '@/deprecated/components/aliplayer/Player'

interface VideoData {
  id: number
  attributes: {
    title: string
    description: string
    videoId: string
    thumbnail?: string
  }
}

interface Video {
  data: VideoData
}

interface CourseData {
  id: number
  attributes: {
    name: string
    slug: string
    description: string
    lessons: Array<Lesson>
  }
}

interface LessonData {
  id: number
  attributes: {
    name: string
    description: string
    article: string
    video?: Video
  }
}

interface Lesson {
  data: LessonData
}

interface Course {
  data: CourseData
}

interface Props {
  course: CourseData
  lessons: Array<LessonData>
  completedLessons?: number[]
}

async function getCourseLessonsBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const path = `/lessons`

  const urlParamsObject = {
    filters: {
      course: {
        slug: slug,
      },
    },
    locale: lang,
    populate: {
      video: '*',
      course: '*',
    },
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }
  const response = await fetchAPI(path, urlParamsObject, options)
  return response.data
}

async function fetchData(
  slug: string,
  lang: string
): Promise<{ course: CourseData; lessons: Array<LessonData> } | null> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const path = `/courses`

  const urlParamsObject = {
    filters: { slug },
    locale: lang,
    // populate: {
    //     lessons: "*"
    // }
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }
  const { data, meta } = await fetchAPI(path, urlParamsObject, options)
  if (data.length === 0) return null

  const course = data[0]

  const lessons = await getCourseLessonsBySlug(course.attributes.slug, lang)

  return { course: course, lessons: lessons }
}

async function getVideoPlayingToken(videoId: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const path = `/generic-vod/vod-video/token/${videoId}`

  const options = { headers: { Authorization: `Bearer ${token}` } }
  const response = await fetchAPI(path, {}, options)
  return response
}

export default async function ViewCourse({
  params,
}: {
  params: { lang: string; slug: string; lesson: string }
}) {
  // const [lessonProgress, setLessonProgress] = useState(completedLessons)

  const data = await fetchData(params.slug, params.lang)

  if (data == null) {
    return null
  }

  const { course, lessons } = data

  const lessonIndex = params.lesson ? parseInt(params.lesson) - 1 : 0

  // const [activeLesson, setActiveLesson] = useState(lessons[lessonIndex]);

  const activeLesson = lessons[lessonIndex]

  const videoId = activeLesson.attributes.video?.data.attributes.videoId

  let playAuth = ''

  // const [playAuth, setPlayAuth] = useState<string>()

  // const [mounted, setMounted] = useState<boolean>(true)

  if (typeof videoId !== 'undefined') {
    const res = await getVideoPlayingToken(videoId as any)
    playAuth = res.playAuth
  }

  // useEffect(() => {
  //     getVideoPlayingToken(videoId as any).then((res) => {
  //         setPlayAuth(res.playAuth)
  //         setMounted(true)
  //     })

  // }, [])

  if (!lessons.length) {
    return (
      <div className='mx-8 mt-12 max-w-lg lg:mx-auto'>
        This course {course.attributes.name} does not have any lessons
      </div>
    )
  }

  return (
    <div className='grid px-5 lg:grid-cols-[70%_30%] '>
      <div>
        {videoId ? (
          <Player
            source=''
            options={{
              vid: videoId,
              playauth: playAuth,
            }}
            className='mb-6 aspect-video w-full'
          />
        ) : (
          <div className='mb-6 aspect-video w-full bg-gray-200' />
        )}

        {/* <Player source='https://outin-068e41f2f56c11e9a7c500163e024c6a.oss-cn-shanghai.aliyuncs.com/sv/33a63a72-188481eb72b/33a63a72-188481eb72b.mp4?Expires=1685286938&OSSAccessKeyId=LTAI3DkxtsbUyNYV&Signature=0YIC3IsfFN1B0hNIiN29XWpMQZ4%3D' className='mb-6 w-full aspect-video' /> */}
        <h1>{activeLesson.attributes.name}</h1>
        <p className='text-lg text-slate-600'>
          {activeLesson.attributes.description}
        </p>
      </div>

      <div>
        {lessons.map((lesson: any) => (
          <a
            key={lesson.id}
            className={clsx({
              'flex cursor-pointer gap-5 px-6 py-4 hover:bg-gray-50': true,
              'bg-yellow-50': activeLesson.id === lesson.id,
            })}
          >
            {/* {lessonProgress.includes(lesson.id) && (
                        <span className='absolute z-10 -translate-x-2 -translate-y-2'>
                            <svg className="w-6 h-6 fill-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </span>
                    )} */}
            {/* 
                    {lesson.attributes.video?.data?.attributes?.thumbnail && (
                        <Image
                            src={lesson.attributes.video?.data.attributes.thumbnail}
                            alt={`Video thumbnail preview for ${lesson.attributes.name}`}
                            width={106}
                            height={60}
                        />
                    )} */}
            <div className='overflow-hidden'>
              <h2>
                <span className='font-cal text-lg font-semibold text-slate-800'>
                  {lesson.attributes.name}
                </span>
                {/* {lesson.video?.duration && (
                                <span className='text-sm italic text-slate-600 truncate'> • {formatDuration(Math.round(lesson.video.duration))}</span>
                            )} */}
              </h2>
              <p className='text-md my-1 truncate italic text-slate-600'>
                {lesson.attributes.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
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

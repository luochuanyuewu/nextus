import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { formatDate, getStrapiMedia } from '@/lib/utils/directus-helpers'

interface Course {
  id: number
  attributes: {
    title: string
    description: string
    slug: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    cover: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    category: {
      data: {
        attributes: {
          name: string
          slug: string
        }
      }
    }
    authorsBio: {
      data: {
        attributes: {
          name: string
          avatar: {
            data: {
              attributes: {
                url: string
              }
            }
          }
        }
      }
    }
  }
}

export default function CourseList({
  data: courses,
  children,
}: {
  data: Course[]
  children?: React.ReactNode
}) {
  return (
    <section className=''>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {courses.map((course) => {
          const imageUrl = getStrapiMedia(
            course.attributes.cover?.data?.attributes.url
          )

          // const category = course.attributes.category.data?.attributes;
          // const authorsBio = course.attributes.authorsBio.data?.attributes;

          // const avatarUrl = getStrapiMedia(
          //     authorsBio?.avatar?.data?.attributes?.url
          // );

          return (
            <Link
              href={`course/${course.attributes.slug}/1`}
              key={course.id}
              className='group mx-auto max-w-sm overflow-hidden rounded-2xl shadow-lg hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px]'
            >
              {imageUrl && (
                <Image
                  alt='presentation'
                  width='240'
                  height='240'
                  className='h-44 w-full object-cover '
                  src={imageUrl}
                />
              )}
              <div className='relative space-y-2 p-6'>
                {/* {avatarUrl && (
                                    <Image
                                        alt="avatar"
                                        width="80"
                                        height="80"
                                        src={avatarUrl}
                                        className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                                    />
                                )} */}

                <h3 className='text-2xl font-semibold group-hover:underline group-focus:underline'>
                  {course.attributes.title}
                </h3>

                <div className='flex items-center justify-between'>
                  <span className='text-xs dark:text-gray-400'>
                    {formatDate(course.attributes.publishedAt)}
                  </span>
                  {/* {authorsBio && (
                                        <span className="text-xs dark:text-gray-400">
                                            {authorsBio.name}
                                        </span>
                                    )} */}
                </div>
                <p className='py-4'>{course.attributes.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
      {children && children}
    </section>
  )
}

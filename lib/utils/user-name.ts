import { DirectusUsers } from '@/lib/directus-collections'

export function userName(user: Partial<DirectusUsers>): string {
  if (!user) {
    return 'Unknown User' as string
  }

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`
  }

  if (user.first_name) {
    return user.first_name
  }

  if (user.email) {
    return user.email
  }

  return 'Unknown User' as string
}

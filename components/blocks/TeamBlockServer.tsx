import directusApi from '@/lib/utils/directus-api'
import TeamBlockClient from './TeamBlock'
import { readItems } from '@directus/sdk'
import { BlockTeam } from '@/lib/directus-collections'

export default async function TeamBlock({ data }: { data: BlockTeam }) {
  const teams = await directusApi.request(readItems('team'))

  return <TeamBlockClient data={data} teams={teams as any}></TeamBlockClient>
}

import HeroBlock from '@/components/blocks/HeroBlock'
import { FormSchema, SocialLink } from '@/data/directus-schema'

export interface BlockCardgroup {
  cards?: BlockCardgroupCards[]
  group_type?: string
  headline?: string
  id: string
  posts?: BlockCardgroupPosts[]
  title?: string
}

export interface BlockCardgroupCards {
  block_cardgroup_id?: string | BlockCardgroup
  href?: string
  id: string
  image?: string | DirectusFiles
  sort?: number
  summary?: string
  title?: string
}

export interface BlockCardgroupPosts {
  block_cardgroup_id?: string | BlockCardgroup
  id: number
  posts_id?: string | Posts
}

export interface BlockColumns {
  headline?: string
  id: string
  rows?: BlockColumnsRows[]
  title?: string
}

export interface BlockColumnsRows {
  block_columns?: string | BlockColumns
  content?: string
  headline?: string
  id: number
  image?: string | DirectusFiles
  image_position?: string
  title?: string
}

export interface BlockCta {
  buttons?: unknown
  content?: string
  headline?: string
  id: string
  title?: string
}

export interface BlockFaqs {
  faqs?: unknown
  headline?: string
  id: string
  title?: string
}

export interface BlockFeatures {
  description?: string
  features?: Array<{
    id: string
    title: string
    description: string
    show_link: boolean
    new_tab: boolean
    url: string
    text: string
  }>
  id: string
  title?: string
}

export interface BlockForm {
  form?: string | Forms
  headline?: string
  id: string
  title?: string
}

export interface BlockGallery {
  gallery_items?: BlockGalleryFiles[]
  headline?: string
  id: string
  title?: string
}

export interface BlockGalleryFiles {
  block_gallery?: string | BlockGallery
  directus_files_id?: string | DirectusFiles
  id: number
  sort?: number
}

export interface BlockHero {
  buttons?: HeroBlock[]
  content?: string
  headline?: string
  id: string
  image?: string | DirectusFiles
}

export interface BlockHtml {
  id: string
  raw_html?: string
}

export interface BlockLogocloud {
  headline?: string
  id: string
  logos?: BlockLogocloudFiles[]
  title?: string
}

export interface BlockLogocloudFiles {
  block_logocloud_id?: string | BlockLogocloud
  file?: string | DirectusFiles
  id: number
  sort?: number
}

export interface BlockQuote {
  background_color?: string
  content?: string
  headline?: string
  id: string
  image?: string | DirectusFiles
  subtitle?: string
  title?: string
}

export interface BlockRichtext {
  content?: string
  headline?: string
  id: string
  title?: string
}

export interface BlockSteps {
  alternate_image_position: boolean
  headline?: string
  id: string
  show_step_numbers?: boolean
  steps?: BlockStepsItems[]
  title?: string
}

export interface BlockStepsItems {
  block_steps?: string | BlockSteps
  content?: string
  id: number
  image?: string | DirectusFiles
  sort?: number
  title?: string
}

export interface BlockTeam {
  content?: string
  headline?: string
  id: string
  title?: string
}

export interface BlockTestimonials {
  headline?: string
  id: string
  testimonials?: BlockTestimonialsItems[]
  title?: string
}

export interface BlockTestimonialsItems {
  block_testimonials_id?: string | BlockTestimonials
  id: number
  sort?: number
  testimonial?: string | Testimonials
}

export interface BlockVideo {
  headline?: string
  id: string
  title?: string
  type?: string
  video_file?: string | DirectusFiles
  video_url?: string
}

export interface BlogSettings {
  featured_post?: string | Posts
  headline?: string
  id: string
  posts_per_page?: number
  seo?: Seo
  title?: string
}

export interface Categories {
  color?: string
  content?: string
  id: string
  seo?: Seo
  slug?: string
  sort?: number
  title?: string
}

export interface ChatConfig {
  enabled?: boolean
  hours?: unknown
  id: string
  modules?: unknown
  require_email?: string
}

export interface Conversations {
  date_created?: string
  date_updated?: string
  id: string
  messages?: Messages[]
  status: string
  title?: string
  visitor_id?: string
}

export interface DirectusActivity {
  action: string
  collection: string
  comment?: string
  id: number
  ip?: string
  item: string
  origin?: string
  revisions?: DirectusRevisions[]
  timestamp: string
  user?: string | DirectusUsers
  user_agent?: string
}

export interface DirectusCollections {
  accountability?: string
  archive_app_filter: boolean
  archive_field?: string
  archive_value?: string
  collapse: string
  collection: string
  color?: string
  display_template?: string
  group?: string | DirectusCollections
  hidden: boolean
  icon?: string
  item_duplication_fields?: unknown
  note?: string
  preview_url?: string
  singleton: boolean
  sort?: number
  sort_field?: string
  translations?: unknown
  unarchive_value?: string
}

export interface DirectusDashboards {
  color?: string
  date_created?: string
  icon: string
  id: string
  name: string
  note?: string
  panels?: DirectusPanels[]
  user_created?: string | DirectusUsers
}

export interface DirectusFields {
  collection?: string | DirectusCollections
  conditions?: unknown
  display?: string
  display_options?: unknown
  field: string
  group?: string | DirectusFields
  hidden: boolean
  id: number
  interface?: string
  note?: string
  options?: unknown
  readonly: boolean
  required?: boolean
  sort?: number
  special?: unknown
  translations?: unknown
  validation?: unknown
  validation_message?: string
  width?: string
}

export interface DirectusFiles {
  charset?: string
  description?: string
  duration?: number
  embed?: string
  filename_disk?: string
  filename_download: string
  filesize?: number
  folder?: string | DirectusFolders
  height?: number
  id: string
  location?: string
  metadata?: unknown
  modified_by?: string | DirectusUsers
  modified_on: string
  storage: string
  tags?: string[]
  title?: string
  type?: string
  uploaded_by?: string | DirectusUsers
  uploaded_on: string
  width?: number
}

export interface DirectusFlows {
  accountability?: string
  color?: string
  date_created?: string
  description?: string
  icon?: string
  id: string
  name: string
  operation?: string | DirectusOperations
  operations?: DirectusOperations[]
  options?: unknown
  status: string
  trigger?: string
  user_created?: string | DirectusUsers
}

export interface DirectusFolders {
  id: string
  name: string
  parent?: string | DirectusFolders
}

export interface DirectusMigrations {
  name: string
  timestamp?: string
  version: string
}

export interface DirectusNotifications {
  collection?: string
  id: number
  item?: string
  message?: string
  recipient?: string | DirectusUsers
  sender?: string | DirectusUsers
  status?: string
  subject: string
  timestamp?: string
}

export interface DirectusOperations {
  date_created?: string
  flow?: string | DirectusFlows
  id: string
  key: string
  name?: string
  options?: unknown
  position_x: number
  position_y: number
  reject?: string | DirectusOperations
  resolve?: string | DirectusOperations
  type: string
  user_created?: string | DirectusUsers
}

export interface DirectusPanels {
  color?: string
  dashboard?: string | DirectusDashboards
  date_created?: string
  height: number
  icon?: string
  id: string
  name?: string
  note?: string
  options?: unknown
  position_x: number
  position_y: number
  show_header: boolean
  type: string
  user_created?: string | DirectusUsers
  width: number
}

export interface DirectusPermissions {
  action: string
  collection: string
  fields?: unknown
  id: number
  permissions?: unknown
  presets?: unknown
  role?: string | DirectusRoles
  validation?: unknown
}

export interface DirectusPresets {
  bookmark?: string
  collection?: string
  color?: string
  filter?: unknown
  icon?: string
  id: number
  layout?: string
  layout_options?: unknown
  layout_query?: unknown
  refresh_interval?: number
  role?: string | DirectusRoles
  search?: string
  user?: string | DirectusUsers
}

export interface DirectusRelations {
  id: number
  junction_field?: string
  many_collection: string
  many_field: string
  one_allowed_collections?: unknown
  one_collection?: string
  one_collection_field?: string
  one_deselect_action: string
  one_field?: string
  sort_field?: string
}

export interface DirectusRevisions {
  activity?: number | DirectusActivity
  collection: string
  data?: unknown
  delta?: unknown
  id: number
  item: string
  parent?: number | DirectusRevisions
}

export interface DirectusRoles {
  admin_access: boolean
  app_access: boolean
  description?: string
  enforce_tfa: boolean
  icon: string
  id: string
  ip_access?: unknown
  name: string
  users?: DirectusUsers[]
}

export interface DirectusSessions {
  expires: string
  ip?: string
  origin?: string
  share?: string | DirectusShares
  token: string
  user?: string | DirectusUsers
  user_agent?: string
}

export interface DirectusSettings {
  ai_pack_config: string
  auth_login_attempts?: number
  auth_password_policy?: string
  basemaps?: unknown
  custom_aspect_ratios?: unknown
  custom_css?: string
  default_language: string
  id: number
  mapbox_key?: string
  module_bar?: unknown
  Open_AI_API_Key?: string
  project_color?: string
  project_descriptor?: string
  project_logo?: string | DirectusFiles
  project_name: string
  project_url?: string
  public_background?: string | DirectusFiles
  public_foreground?: string | DirectusFiles
  public_note?: string
  Stability_AI_API_Key?: string
  storage_asset_presets?: unknown
  storage_asset_transform?: string
  storage_default_folder?: string | DirectusFolders
}

export interface DirectusShares {
  collection?: string | DirectusCollections
  date_created?: string
  date_end?: string
  date_start?: string
  id: string
  item?: string
  max_uses?: number
  name?: string
  password?: string
  role?: string | DirectusRoles
  times_used?: number
  user_created?: string | DirectusUsers
}

export interface DirectusTranslations {
  id: string
  key: string
  language: string
  value: string
}

export interface DirectusUsers {
  auth_data?: unknown
  avatar?: string | DirectusFiles
  description?: string
  email?: string
  email_notifications?: boolean
  external_identifier?: string
  first_name?: string
  id: string
  language?: string
  last_access?: string
  last_name?: string
  last_page?: string
  location?: string
  password?: string
  provider: string
  role?: string | DirectusRoles
  status: string
  tags?: unknown
  tfa_secret?: string
  theme?: string
  title?: string
  token?: string
}

export interface DirectusWebhooks {
  actions: unknown
  collections: unknown
  data: boolean
  headers?: unknown
  id: number
  method: string
  name: string
  status: string
  url: string
}

export interface Events {
  id: string
  key?: string
  metadata?: unknown
  service?: string
  session?: string
  timestamp?: string
  user?: string
}

export interface Forms {
  date_created?: string
  date_updated?: string
  id: string
  key?: string
  on_success?: string
  redirect_url?: string
  schema: FormSchema[]
  sort?: number
  status: string
  submit_label?: string
  success_message?: string
  title?: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface Globals {
  favicon?: DirectusFiles
  id: string
  translations: GlobalsTranslations[]
  url?: string
  umami_analytics_id?: string
  umami_script_url?: string
  google_analytics_id?: string
  baidu_analytics_id?: string
}

export interface GlobalsTranslations {
  address_country?: string
  address_locality?: string
  address_region?: string
  blog_setting: BlogSettings
  build_hook_url?: string
  contact: string
  deployment: string
  email?: string
  globals_id?: string | Globals
  id: number
  languages_code?: string | Languages
  og_image?: string | DirectusFiles
  phone?: string
  postal_code?: string
  project_setting: ProjectsSettings
  routes?: unknown
  seo: string
  setting: string
  social: string
  social_links?: SocialLink[]
  street_address?: string
  tagline?: string
  description: string
  title: string
}

export interface HelpArticles {
  date_created?: string
  date_updated?: string
  help_collection: HelpCollections
  id: string
  owner?: DirectusUsers
  slug?: string
  sort?: number
  status: string
  translations: HelpArticlesTranslations[]
  type?: 'group' | 'article'
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface HelpArticlesTranslations {
  content?: string
  help_articles_id?: string | HelpArticles
  id: number
  languages_code?: string | Languages
  summary?: string
  title?: string
}

export interface HelpCollections {
  articles?: HelpArticles[]
  cover?: string | DirectusFiles
  id: string
  slug?: string
  sort?: number
  translations: HelpCollectionsTranslations[]
}

export type HelpCollectionsTranslations = {
  description?: string
  help_collections_id?: string | HelpCollections
  id: number
  languages_code?: string | Languages
  title?: string
}

export interface HelpFeedback {
  comments?: string
  date_created?: string
  date_updated?: string
  id: string
  rating?: number
  title?: string
  url?: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
  visitor_id?: string
}

export interface Inbox {
  data?: unknown
  date_created?: string
  date_updated?: string
  form?: string | Forms
  id: string
  sort?: number
  status: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface Languages {
  code: string
  name?: string
  sort?: number
}

export interface Messages {
  conversation?: string | Conversations
  date_created?: string
  date_updated?: string
  id: string
  text?: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
  visitor_id?: string
}

export interface Metrics {
  id: string
  key?: string
  metadata?: unknown
  service?: string
  timestamp?: string
  value?: number
}

export interface Navigation {
  date_created?: string
  date_updated?: string
  id: string
  items: NavigationItems[]
  language?: string | Languages
  slug: string
  status: string
  title: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface NavigationItems {
  children?: NavigationItems[]
  display_details: string
  has_children?: boolean
  icon?: string
  id: string
  label?: string
  navigation?: string | Navigation
  open_in_new_tab?: boolean
  page?: string | Pages
  parent?: string | NavigationItems
  sort?: number
  title?: string
  type?: string
  url?: string
}

export interface Pages {
  date_created?: string
  date_updated?: string
  id: string
  /**
   * @deprecated No longer used.
   */
  seo?: Seo
  slug?: string
  sort?: number
  status: string
  title?: string
  translations?: PagesTranslations[]
  user_created?: string
  user_updated?: string
}

export interface PagesTranslations {
  blocks: PagesTranslationsBlocks[]
  id: number
  languages_code: string | Languages
  pages_id?: string | Pages
  title?: string
}

export interface PagesTranslationsBlocks {
  collection?: string
  id: number
  item?: string | any
  pages_translations_id?: number | PagesTranslations
  sort?: number
}

export interface Posts {
  author?: string | DirectusUsers
  category?: Categories
  date_created?: string
  date_published?: string
  date_updated?: string
  id: string
  image?: string | DirectusFiles
  seo?: Seo
  slug?: string
  sort?: number
  status: string
  translations?: PostsTranslations[]
  user_created?: string
  user_updated?: string
}

export interface PostsTranslations {
  content: string
  id: number
  languages_code?: string | Languages
  posts_id?: string | Posts
  summary?: string
  title?: string
}

export interface Projects {
  built_with?: string[]
  client?: string
  content?: string
  cost?: string
  date_created?: string
  date_updated?: string
  details: string
  gallery?: ProjectsFiles[]
  id: string
  image?: string | DirectusFiles
  seo?: Seo
  slug?: string
  sort?: number
  status: string
  summary?: string
  title?: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface ProjectsFiles {
  directus_files_id?: string | DirectusFiles
  id: number
  project?: string | Projects
  sort?: number
}

export interface ProjectsSettings {
  headline?: string
  id: string
  seo?: Seo
  title?: string
}

export interface Redirects {
  date_created?: string
  date_updated?: string
  id: string
  response_code?: number
  url_new?: string
  url_old?: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface Seo {
  canonical_url?: string
  id: string
  meta_description?: string
  no_follow?: boolean
  no_index?: boolean
  og_image?: string | DirectusFiles
  sitemap_change_frequency?: string
  sitemap_priority?: number
  title?: string
}

export interface Team {
  bio?: string
  date_created?: string
  date_updated?: string
  id: string
  image?: string | DirectusFiles
  job_title?: string
  name?: string
  social_media?: SocialLink[]
  sort?: number
  status: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface Testimonials {
  company?: string
  company_info: string
  company_logo?: string | DirectusFiles
  content?: string
  date_created?: string
  date_updated?: string
  id: string
  image?: string | DirectusFiles
  link?: string
  sort?: number
  status: string
  subtitle?: string
  title?: string
  user_created?: string | DirectusUsers
  user_updated?: string | DirectusUsers
}

export interface CustomDirectusTypes {
  block_cardgroup: BlockCardgroup
  block_cardgroup_cards: BlockCardgroupCards
  block_cardgroup_posts: BlockCardgroupPosts
  block_columns: BlockColumns
  block_columns_rows: BlockColumnsRows
  block_cta: BlockCta
  block_faqs: BlockFaqs
  block_features: BlockFeatures
  block_form: BlockForm
  block_gallery: BlockGallery
  block_gallery_files: BlockGalleryFiles
  block_hero: BlockHero
  block_html: BlockHtml
  block_logocloud: BlockLogocloud
  block_logocloud_files: BlockLogocloudFiles
  block_quote: BlockQuote
  block_richtext: BlockRichtext
  block_steps: BlockSteps
  block_steps_items: BlockStepsItems
  block_team: BlockTeam
  block_testimonials: BlockTestimonials
  block_testimonials_items: BlockTestimonialsItems
  block_video: BlockVideo
  blog_settings: BlogSettings
  categories: Categories
  chat_config: ChatConfig
  conversations: Conversations
  directus_activity: DirectusActivity
  directus_collections: DirectusCollections
  directus_dashboards: DirectusDashboards
  directus_fields: DirectusFields
  directus_files: DirectusFiles
  directus_flows: DirectusFlows
  directus_folders: DirectusFolders
  directus_migrations: DirectusMigrations
  directus_notifications: DirectusNotifications
  directus_operations: DirectusOperations
  directus_panels: DirectusPanels
  directus_permissions: DirectusPermissions
  directus_presets: DirectusPresets
  directus_relations: DirectusRelations
  directus_revisions: DirectusRevisions
  directus_roles: DirectusRoles
  directus_sessions: DirectusSessions
  directus_settings: DirectusSettings
  directus_shares: DirectusShares
  directus_translations: DirectusTranslations
  directus_users: DirectusUsers
  directus_webhooks: DirectusWebhooks
  events: Events
  forms: Forms
  globals: Globals
  globals_translations: GlobalsTranslations
  help_articles: HelpArticles
  help_articles_translations: HelpArticlesTranslations
  help_collections: HelpCollections
  help_collections_translations: HelpCollectionsTranslations
  help_feedback: HelpFeedback
  inbox: Inbox
  languages: Languages
  messages: Messages
  metrics: Metrics
  navigation: Navigation
  navigation_items: NavigationItems
  pages: Pages
  pages_translations: PagesTranslations
  pages_translations_blocks: PagesTranslationsBlocks
  posts: Posts
  posts_translations: PostsTranslations
  projects: Projects
  projects_files: ProjectsFiles
  projects_settings: ProjectsSettings
  redirects: Redirects
  seo: Seo
  team: Team
  testimonials: Testimonials
}

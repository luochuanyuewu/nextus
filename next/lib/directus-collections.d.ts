import { FormElement } from '@/types/schemas';
export interface DirectusSchema {
  block_cardgroup: BlockCardgroup[];
  block_cardgroup_cards: BlockCardgroupCards[];
  block_cardgroup_posts: BlockCardgroupPosts[];
  block_columns: BlockColumns[];
  block_columns_rows: BlockColumnsRows[];
  block_cta: BlockCta[];
  block_faqs: BlockFaqs[];
  block_form: BlockForm[];
  block_gallery: BlockGallery[];
  block_gallery_files: BlockGalleryFiles[];
  block_hero: BlockHero[];
  block_html: BlockHtml[];
  block_logocloud: BlockLogocloud[];
  block_logocloud_files: BlockLogocloudFiles[];
  block_quote: BlockQuote[];
  block_richtext: BlockRichtext[];
  block_steps: BlockSteps[];
  block_steps_items: BlockStepsItems[];
  block_team: BlockTeam[];
  block_testimonials: BlockTestimonials[];
  block_testimonials_items: BlockTestimonialsItems[];
  block_video: BlockVideo[];
  blog_settings: BlogSettings[];
  pages_blocks: PagesBlocks[];
  categories: Categories[];
  chat_config: ChatConfig
  conversations: Conversations[];
  events: Events[];
  forms: Forms[];
  globals: Globals;
  help_articles: HelpArticles[];
  help_collections: HelpCollections[];
  help_feedback: HelpFeedback[];
  inbox: Inbox[];
  messages: Messages[];
  metrics: Metrics[];
  navigation: Navigation[];
  navigation_items: NavigationItems[];
  pages: Pages[];
  posts: Posts[];
  projects: Projects[];
  projects_files: ProjectsFiles[];
  projects_settings: ProjectsSettings;
  redirects: Redirects[];
  seo: Seo[];
  team: Team[];
  testimonials: Testimonials[];
  directus_files: DirectusFiles[];
}

export type BlockCardgroup = {
  cards?: BlockCardgroupCards[] | null;
  group_type?: string | null;
  headline?: string | null;
  id: string;
  posts?: BlockCardgroupPosts[] | null;
  title?: string | null;
};

export type BlockCardgroupCards = {
  block_cardgroup_id?: string | BlockCardgroup | null;
  href?: string | null;
  id: string;
  image?: string | DirectusFiles | null;
  sort?: number | null;
  summary?: string | null;
  title?: string | null;
};

export type BlockCardgroupPosts = {
  block_cardgroup_id?: string | BlockCardgroup | null;
  id: number;
  posts_id?: string | Posts | null;
};

export type BlockColumns = {
  headline?: string | null;
  id: string;
  rows?: BlockColumnsRows[] | null;
  title?: string | null;
};

export type BlockColumnsRows = {
  block_columns?: string | BlockColumns | null;
  content?: string | null;
  headline?: string | null;
  id: number;
  image?: string | DirectusFiles | null;
  image_position?: string | null;
  title?: string | null;
};

export type BlockCta = {
  buttons?: unknown | null;
  content?: string | null;
  headline?: string | null;
  id: string;
  title?: string | null;
};

export type BlockFaqs = {
  faqs?: unknown | null;
  headline?: string | null;
  id: string;
  title?: string | null;
};

export type BlockForm = {
  form?: string | Forms | null;
  headline?: string | null;
  id: string;
  title?: string | null;
};

export type BlockGallery = {
  gallery_items?: BlockGalleryFiles[] | null;
  headline?: string | null;
  id: string;
  title?: string | null;
};

export type BlockGalleryFiles = {
  block_gallery?: string | BlockGallery | null;
  directus_files_id?: string | DirectusFiles | null;
  id: number;
  sort?: number | null;
};

export type BlockHero = {
  buttons?:  Array<{
    label: string
    href: string
    variant: string
    open_in_new_window: boolean
  }> | null;
  content?: string | null;
  headline?: string | null;
  id: string;
  image?: string | DirectusFiles | null;
};

export type BlockHtml = {
  id: string;
  raw_html?: string | null;
};

export type BlockLogocloud = {
  headline?: string | null;
  id: string;
  logos?: BlockLogocloudFiles[] | null;
  title?: string | null;
};

export type BlockLogocloudFiles = {
  block_logocloud_id?: string | BlockLogocloud | null;
  file?: string | DirectusFiles | null;
  id: number;
  sort?: number | null;
};

export type BlockQuote = {
  background_color?: string | null;
  content?: string | null;
  headline?: string | null;
  id: string;
  image?: string | DirectusFiles | null;
  subtitle?: string | null;
  title?: string | null;
};

export type BlockRichtext = {
  content?: string | null;
  headline?: string | null;
  id: string;
  title?: string | null;
};

export type BlockSteps = {
  alternate_image_position: boolean;
  headline?: string | null;
  id: string;
  show_step_numbers?: boolean | null;
  steps?: BlockStepsItems[] | null;
  title?: string | null;
};

export type BlockStepsItems = {
  block_steps?: string | BlockSteps | null;
  content?: string | null;
  id: number;
  image?: string | DirectusFiles | null;
  sort?: number | null;
  title?: string | null;
};

export type BlockTeam = {
  content?: string | null;
  headline?: string | null;
  id: string;
  title?: string | null;
};

export type BlockTestimonials = {
  headline?: string | null;
  id: string;
  testimonials?: BlockTestimonialsItems[] | null;
  title?: string | null;
};

export type BlockTestimonialsItems = {
  block_testimonials_id?: string | BlockTestimonials | null;
  id: number;
  sort?: number | null;
  testimonial?: string | Testimonials | null;
};

export type BlockVideo = {
  headline?: string | null;
  id: string;
  title?: string | null;
  type?: string | null;
  video_file?: string | DirectusFiles | null;
  video_url?: string | null;
};

export type BlogSettings = {
  featured_post?: string | Posts | null;
  headline?: string | null;
  id: string;
  posts_per_page?: number | null;
  seo?: string | Seo | null;
  title?: string | null;
};

export type Categories = {
  color?: string | null;
  content?: string | null;
  id: string;
  seo?: string | Seo | null;
  slug?: string | null;
  sort?: number | null;
  title?: string | null;
};

export type ChatConfig = {
  enabled?: boolean | null;
  hours?: unknown | null;
  id: string;
  modules?: unknown | null;
  require_email?: string | null;
};

export type Conversations = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  messages?: Messages[] | null;
  status: string;
  title?: string | null;
  visitor_id?: string | null;
};

export type DirectusActivity = {
  action: string;
  collection: string;
  comment?: string | null;
  id: number;
  ip?: string | null;
  item: string;
  origin?: string | null;
  revisions?: DirectusRevisions[] | null;
  timestamp: string;
  user?: string | DirectusUsers | null;
  user_agent?: string | null;
};

export type DirectusCollections = {
  accountability?: string | null;
  archive_app_filter: boolean;
  archive_field?: string | null;
  archive_value?: string | null;
  collapse: string;
  collection: string;
  color?: string | null;
  display_template?: string | null;
  group?: string | DirectusCollections | null;
  hidden: boolean;
  icon?: string | null;
  item_duplication_fields?: unknown | null;
  note?: string | null;
  preview_url?: string | null;
  singleton: boolean;
  sort?: number | null;
  sort_field?: string | null;
  translations?: unknown | null;
  unarchive_value?: string | null;
};

export type DirectusDashboards = {
  color?: string | null;
  date_created?: string | null;
  icon: string;
  id: string;
  name: string;
  note?: string | null;
  panels?: DirectusPanels[] | null;
  user_created?: string | DirectusUsers | null;
};

export type DirectusFields = {
  collection?: string | DirectusCollections | null;
  conditions?: unknown | null;
  display?: string | null;
  display_options?: unknown | null;
  field: string;
  group?: string | DirectusFields | null;
  hidden: boolean;
  id: number;
  interface?: string | null;
  note?: string | null;
  options?: unknown | null;
  readonly: boolean;
  required?: boolean | null;
  sort?: number | null;
  special?: unknown | null;
  translations?: unknown | null;
  validation?: unknown | null;
  validation_message?: string | null;
  width?: string | null;
};

export type DirectusFiles = {
  charset?: string | null;
  description?: string | null;
  duration?: number | null;
  embed?: string | null;
  filename_disk?: string | null;
  filename_download: string;
  filesize?: number | null;
  folder?: string | DirectusFolders | null;
  height?: number | null;
  id: string;
  location?: string | null;
  metadata?: unknown | null;
  modified_by?: string | DirectusUsers | null;
  modified_on: string;
  storage: string;
  tags?: unknown | null;
  title?: string | null;
  type?: string | null;
  uploaded_by?: string | DirectusUsers | null;
  uploaded_on: string;
  width?: number | null;
};

export type DirectusFlows = {
  accountability?: string | null;
  color?: string | null;
  date_created?: string | null;
  description?: string | null;
  icon?: string | null;
  id: string;
  name: string;
  operation?: string | DirectusOperations | null;
  operations?: DirectusOperations[] | null;
  options?: unknown | null;
  status: string;
  trigger?: string | null;
  user_created?: string | DirectusUsers | null;
};

export type DirectusFolders = {
  id: string;
  name: string;
  parent?: string | DirectusFolders | null;
};

export type DirectusMigrations = {
  name: string;
  timestamp?: string | null;
  version: string;
};

export type DirectusNotifications = {
  collection?: string | null;
  id: number;
  item?: string | null;
  message?: string | null;
  recipient?: string | DirectusUsers | null;
  sender?: string | DirectusUsers | null;
  status?: string | null;
  subject: string;
  timestamp?: string | null;
};

export type DirectusOperations = {
  date_created?: string | null;
  flow?: string | DirectusFlows | null;
  id: string;
  key: string;
  name?: string | null;
  options?: unknown | null;
  position_x: number;
  position_y: number;
  reject?: string | DirectusOperations | null;
  resolve?: string | DirectusOperations | null;
  type: string;
  user_created?: string | DirectusUsers | null;
};

export type DirectusPanels = {
  color?: string | null;
  dashboard?: string | DirectusDashboards | null;
  date_created?: string | null;
  height: number;
  icon?: string | null;
  id: string;
  name?: string | null;
  note?: string | null;
  options?: unknown | null;
  position_x: number;
  position_y: number;
  show_header: boolean;
  type: string;
  user_created?: string | DirectusUsers | null;
  width: number;
};

export type DirectusPermissions = {
  action: string;
  collection: string;
  fields?: unknown | null;
  id: number;
  permissions?: unknown | null;
  presets?: unknown | null;
  role?: string | DirectusRoles | null;
  validation?: unknown | null;
};

export type DirectusPresets = {
  bookmark?: string | null;
  collection?: string | null;
  color?: string | null;
  filter?: unknown | null;
  icon?: string | null;
  id: number;
  layout?: string | null;
  layout_options?: unknown | null;
  layout_query?: unknown | null;
  refresh_interval?: number | null;
  role?: string | DirectusRoles | null;
  search?: string | null;
  user?: string | DirectusUsers | null;
};

export type DirectusRelations = {
  id: number;
  junction_field?: string | null;
  many_collection: string;
  many_field: string;
  one_allowed_collections?: unknown | null;
  one_collection?: string | null;
  one_collection_field?: string | null;
  one_deselect_action: string;
  one_field?: string | null;
  sort_field?: string | null;
};

export type DirectusRevisions = {
  activity?: number | DirectusActivity | null;
  collection: string;
  data?: unknown | null;
  delta?: unknown | null;
  id: number;
  item: string;
  parent?: number | DirectusRevisions | null;
};

export type DirectusRoles = {
  admin_access: boolean;
  app_access: boolean;
  description?: string | null;
  enforce_tfa: boolean;
  icon: string;
  id: string;
  ip_access?: unknown | null;
  name: string;
  users?: DirectusUsers[] | null;
};

export type DirectusSessions = {
  expires: string;
  ip?: string | null;
  origin?: string | null;
  share?: string | DirectusShares | null;
  token: string;
  user?: string | DirectusUsers | null;
  user_agent?: string | null;
};

export type DirectusSettings = {
  ai_pack_config: string;
  auth_login_attempts?: number | null;
  auth_password_policy?: string | null;
  basemaps?: unknown | null;
  custom_aspect_ratios?: unknown | null;
  custom_css?: string | null;
  default_language: string;
  id: number;
  mapbox_key?: string | null;
  module_bar?: unknown | null;
  Open_AI_API_Key?: string | null;
  project_color?: string | null;
  project_descriptor?: string | null;
  project_logo?: string | DirectusFiles | null;
  project_name: string;
  project_url?: string | null;
  public_background?: string | DirectusFiles | null;
  public_foreground?: string | DirectusFiles | null;
  public_note?: string | null;
  Stability_AI_API_Key?: string | null;
  storage_asset_presets?: unknown | null;
  storage_asset_transform?: string | null;
  storage_default_folder?: string | DirectusFolders | null;
};

export type DirectusShares = {
  collection?: string | DirectusCollections | null;
  date_created?: string | null;
  date_end?: string | null;
  date_start?: string | null;
  id: string;
  item?: string | null;
  max_uses?: number | null;
  name?: string | null;
  password?: string | null;
  role?: string | DirectusRoles | null;
  times_used?: number | null;
  user_created?: string | DirectusUsers | null;
};

export type DirectusTranslations = {
  id: string;
  key: string;
  language: string;
  value: string;
};

export type DirectusUsers = {
  auth_data?: unknown | null;
  avatar?: string | DirectusFiles | null;
  description?: string | null;
  email?: string | null;
  email_notifications?: boolean | null;
  external_identifier?: string | null;
  first_name?: string | null;
  id: string;
  language?: string | null;
  last_access?: string | null;
  last_name?: string | null;
  last_page?: string | null;
  location?: string | null;
  password?: string | null;
  provider: string;
  role?: string | DirectusRoles | null;
  status: string;
  tags?: unknown | null;
  tfa_secret?: string | null;
  theme?: string | null;
  title?: string | null;
  token?: string | null;
};

export type DirectusWebhooks = {
  actions: unknown;
  collections: unknown;
  data: boolean;
  headers?: unknown | null;
  id: number;
  method: string;
  name: string;
  status: string;
  url: string;
};

export type Events = {
  id: string;
  key?: string | null;
  metadata?: unknown | null;
  service?: string | null;
  session?: string | null;
  timestamp?: string | null;
  user?: string | null;
};

export type Forms = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  key?: string | null;
  on_success?: string | null;
  redirect_url?: string | null;
  schema?: FormElement | null;
  sort?: number | null;
  status: string;
  submit_label?: string | null;
  success_message?: string | null;
  title?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type Globals = {
  address_country?: string | null;
  address_locality?: string | null;
  address_region?: string | null;
  build_hook_url?: string | null;
  contact: string;
  deployment: string;
  description?: string | null;
  email?: string | null;
  favicon?: string | DirectusFiles | null;
  id: string;
  og_image?: string | DirectusFiles | null;
  phone?: string | null;
  postal_code?: string | null;
  routes?: unknown | null;
  seo: string;
  social: string;
  social_links?: Array<{ service: string, url: string }> | null;
  street_address?: string | null;
  tagline?: string | null;
  title?: string | null;
  url?: string | null;
};

export type HelpArticles = {
  content?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  help_collection?: string | HelpCollections | null;
  id: string;
  owner?: string | DirectusUsers | null;
  slug?: string | null;
  sort?: number | null;
  status: string;
  summary?: string | null;
  title?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type HelpCollections = {
  articles?: HelpArticles[] | null;
  description?: string | null;
  icon?: string | null;
  id: string;
  slug?: string | null;
  sort?: number | null;
  title?: string | null;
};

export type HelpFeedback = {
  comments?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  rating?: number | null;
  title?: string | null;
  url?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
  visitor_id?: string | null;
};

export type Inbox = {
  data?: unknown | null;
  date_created?: string | null;
  date_updated?: string | null;
  form?: string | Forms | null;
  id: string;
  sort?: number | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type Messages = {
  conversation?: string | Conversations | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  text?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
  visitor_id?: string | null;
};

export type Metrics = {
  id: string;
  key?: string | null;
  metadata?: unknown | null;
  service?: string | null;
  timestamp?: string | null;
  value?: number | null;
};

export type Navigation = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  items?: NavigationItems[] | null;
  status: string;
  title?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type NavigationItems = {
  children?: NavigationItems[] | null;
  display_details: string;
  has_children?: boolean | null;
  icon?: string | null;
  id: string;
  label?: string | null;
  navigation?: string | Navigation | null;
  open_in_new_tab?: boolean | null;
  page?: string | Pages | null;
  parent?: NavigationItems | null;
  sort?: number | null;
  title?: string | null;
  type?: string | null;
  url?: string | null;
};

export type Pages = {
  blocks?: PagesBlocks[] | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  seo?: string | Seo | null;
  slug?: string | null;
  sort?: number | null;
  status: string;
  title?: string | null;
  user_created?: string | null;
  user_updated?: string | null;
};

export type PagesBlocks = {
  collection?: string | null;
  id: number;
  item?: string | any | null;
  pages_id?: string | Pages | null;
  sort?: number | null;
};

export type Posts = {
  author?: string | DirectusUsers | null;
  category?: string | Categories | null;
  content?: string | null;
  date_created?: string | null;
  date_published?: string | null;
  date_updated?: string | null;
  id: string;
  image?: string | DirectusFiles | null;
  seo?: string | Seo | null;
  slug?: string | null;
  sort?: number | null;
  status: string;
  summary?: string | null;
  title?: string | null;
  user_created?: string | null;
  user_updated?: string | null;
};

export type Projects = {
  built_with?: Array<string> | null;
  client?: string | null;
  content?: string | null;
  cost?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  details: string;
  gallery?: ProjectsFiles[] | null;
  // gallery?: ProjectsFiles[] | null;
  id: string;
  image?: string | DirectusFiles | null;
  seo?: string | Seo | null;
  slug?: string | null;
  sort?: number | null;
  status: string;
  summary?: string | null;
  title?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type ProjectsFiles = {
  directus_files_id?: string | DirectusFiles | null;
  id: number;
  project?: string | Projects | null;
  sort?: number | null;
};

export type ProjectsSettings = {
  headline?: string | null;
  id: string;
  seo?: string | Seo | null;
  title?: string | null;
};

export type Redirects = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  response_code?: number | null;
  url_new?: string | null;
  url_old?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type Seo = {
  canonical_url?: string | null;
  id: string;
  meta_description?: string | null;
  no_follow?: boolean | null;
  no_index?: boolean | null;
  og_image?: string | DirectusFiles | null;
  sitemap_change_frequency?: string | null;
  sitemap_priority?: number | null;
  title?: string | null;
};

export type Team = {
  bio?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  image?: string | DirectusFiles | null;
  job_title?: string | null;
  name?: string | null;
  social_media?: Array<{ service: string, url: string }> | null;
  sort?: number | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type Testimonials = {
  company?: string | null;
  company_info: string;
  company_logo?: string | DirectusFiles | null;
  content?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  image?: string | DirectusFiles | null;
  link?: string | null;
  sort?: number | null;
  status: string;
  subtitle?: string | null;
  title?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type CustomDirectusTypes = {
  block_cardgroup: BlockCardgroup;
  block_cardgroup_cards: BlockCardgroupCards;
  block_cardgroup_posts: BlockCardgroupPosts;
  block_columns: BlockColumns;
  block_columns_rows: BlockColumnsRows;
  block_cta: BlockCta;
  block_faqs: BlockFaqs;
  block_form: BlockForm;
  block_gallery: BlockGallery;
  block_gallery_files: BlockGalleryFiles;
  block_hero: BlockHero;
  block_html: BlockHtml;
  block_logocloud: BlockLogocloud;
  block_logocloud_files: BlockLogocloudFiles;
  block_quote: BlockQuote;
  block_richtext: BlockRichtext;
  block_steps: BlockSteps;
  block_steps_items: BlockStepsItems;
  block_team: BlockTeam;
  block_testimonials: BlockTestimonials;
  block_testimonials_items: BlockTestimonialsItems;
  block_video: BlockVideo;
  blog_settings: BlogSettings;
  categories: Categories;
  chat_config: ChatConfig;
  conversations: Conversations;
  directus_activity: DirectusActivity;
  directus_collections: DirectusCollections;
  directus_dashboards: DirectusDashboards;
  directus_fields: DirectusFields;
  directus_files: DirectusFiles;
  directus_flows: DirectusFlows;
  directus_folders: DirectusFolders;
  directus_migrations: DirectusMigrations;
  directus_notifications: DirectusNotifications;
  directus_operations: DirectusOperations;
  directus_panels: DirectusPanels;
  directus_permissions: DirectusPermissions;
  directus_presets: DirectusPresets;
  directus_relations: DirectusRelations;
  directus_revisions: DirectusRevisions;
  directus_roles: DirectusRoles;
  directus_sessions: DirectusSessions;
  directus_settings: DirectusSettings;
  directus_shares: DirectusShares;
  directus_translations: DirectusTranslations;
  directus_users: DirectusUsers;
  directus_webhooks: DirectusWebhooks;
  events: Events;
  forms: Forms;
  globals: Globals;
  help_articles: HelpArticles;
  help_collections: HelpCollections;
  help_feedback: HelpFeedback;
  inbox: Inbox;
  messages: Messages;
  metrics: Metrics;
  navigation: Navigation;
  navigation_items: NavigationItems;
  pages: Pages;
  pages_blocks: PagesBlocks;
  posts: Posts;
  projects: Projects;
  projects_files: ProjectsFiles;
  projects_settings: ProjectsSettings;
  redirects: Redirects;
  seo: Seo;
  team: Team;
  testimonials: Testimonials;
};

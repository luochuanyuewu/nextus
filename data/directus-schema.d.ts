import {
  BlockCardgroup,
  BlockCardgroupCards,
  BlockCardgroupPosts,
  BlockColumns,
  BlockColumnsRows,
  BlockCta,
  BlockFaqs,
  BlockForm,
  BlockGallery,
  BlockGalleryFiles,
  BlockHero,
  BlockHtml,
  BlockLogocloud,
  BlockLogocloudFiles,
  BlockQuote,
  BlockRichtext,
  BlockSteps,
  BlockStepsItems,
  BlockTeam,
  BlockTestimonials,
  BlockTestimonialsItems,
  BlockVideo,
  BlogSettings,
  Categories,
  ChatConfig,
  Conversations,
  DirectusActivity,
  DirectusCollections,
  DirectusDashboards,
  DirectusFields,
  DirectusFiles,
  DirectusFlows,
  DirectusFolders,
  DirectusMigrations,
  DirectusNotifications,
  DirectusOperations,
  DirectusPanels,
  DirectusPermissions,
  DirectusPresets,
  DirectusRelations,
  DirectusRevisions,
  DirectusRoles,
  DirectusSessions,
  DirectusSettings,
  DirectusShares,
  DirectusTranslations,
  DirectusUsers,
  DirectusWebhooks,
  Events,
  Forms,
  Globals,
  GlobalsTranslations,
  HelpArticles,
  HelpCollections,
  HelpFeedback,
  Inbox,
  Languages,
  Messages,
  Metrics,
  Navigation,
  NavigationItems,
  Pages,
  PagesTranslations,
  PagesTranslationsBlocks,
  Posts,
  PostsTranslations,
  Projects,
  ProjectsFiles,
  ProjectsSettings,
  Redirects,
  Seo,
  Team,
  Testimonials,
} from '@/data/directus-collections'

export interface FormSchema {
  name: string
  type: string
  label: string
  placeholder: string
  help: string
  validation: any
  width: string | number
  choices?: { label: string; value: any }[]
  outerclass?: string //not coming from backend.
}

export interface HeroButton {
  label: string
  href: string
  variant: string
  open_in_new_window: boolean
}

export interface SocialLink {
  service: string
  url: string
}

// as directus sdk root definition

export interface DirectusSchema {
  block_cardgroup: BlockCardgroup[]
  block_cardgroup_cards: BlockCardgroupCards[]
  block_cardgroup_posts: BlockCardgroupPosts[]
  block_columns: BlockColumns[]
  block_columns_rows: BlockColumnsRows[]
  block_cta: BlockCta[]
  block_faqs: BlockFaqs[]
  block_features: BlockFeatures[]
  block_form: BlockForm[]
  block_gallery: BlockGallery[]
  block_gallery_files: BlockGalleryFiles[]
  block_hero: BlockHero[]
  block_html: BlockHtml[]
  block_logocloud: BlockLogocloud[]
  block_logocloud_files: BlockLogocloudFiles[]
  block_quote: BlockQuote[]
  block_richtext: BlockRichtext[]
  block_steps: BlockSteps[]
  block_steps_items: BlockStepsItems[]
  block_team: BlockTeam[]
  block_testimonials: BlockTestimonials[]
  block_testimonials_items: BlockTestimonialsItems[]
  block_video: BlockVideo[]
  blog_settings: BlogSettings[]
  categories: Categories[]
  chat_config: ChatConfig
  conversations: Conversations[]
  directus_activity: DirectusActivity[]
  directus_collections: DirectusCollections[]
  directus_dashboards: DirectusDashboards[]
  directus_fields: DirectusFields[]
  directus_files: DirectusFiles[]
  directus_flows: DirectusFlows[]
  directus_folders: DirectusFolders[]
  directus_migrations: DirectusMigrations[]
  directus_notifications: DirectusNotifications[]
  directus_operations: DirectusOperations[]
  directus_panels: DirectusPanels[]
  directus_permissions: DirectusPermissions[]
  directus_presets: DirectusPresets[]
  directus_relations: DirectusRelations[]
  directus_revisions: DirectusRevisions[]
  directus_roles: DirectusRoles[]
  directus_sessions: DirectusSessions[]
  directus_settings: DirectusSettings[]
  directus_shares: DirectusShares[]
  directus_translations: DirectusTranslations[]
  directus_users: DirectusUsers[]
  directus_webhooks: DirectusWebhooks[]
  events: Events[]
  forms: Forms[]
  globals: Globals
  globals_translations: GlobalsTranslations[]
  help_articles: HelpArticles[]
  help_articles_translations: HelpArticlesTranslations[]
  help_collections: HelpCollections[]
  help_collections_translations: HelpCollectionsTranslations[]
  help_feedback: HelpFeedback[]
  inbox: Inbox[]
  languages: Languages[]
  messages: Messages[]
  metrics: Metrics[]
  navigation: Navigation[]
  navigation_items: NavigationItems[]
  pages: Pages[]
  pages_translations: PagesTranslations[]
  pages_translations_blocks: PagesTranslationsBlocks[]
  posts: Posts[]
  posts_translations: PostsTranslations[]
  projects: Projects[]
  projects_files: ProjectsFiles[]
  projects_settings: ProjectsSettings[]
  redirects: Redirects[]
  seo: Seo[]
  team: Team[]
  testimonials: Testimonials[]
}

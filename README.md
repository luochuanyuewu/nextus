<a href="https://github.com/luochuanyuewu/nextus" target="_blank">
  <h1 align="center">Nextus</h1>
</a>

# Readme Not Done yet

<p align="center">Welcome to Nextus, Nextus is a comprehensive, versatile and modern website template based on Nextjs and Directus technologies. It helps you build various types of websites more quickly.</p>

<p align="center">欢迎来到Nextus, Nextus是一个完整全面、且多功能的现代化网站模板，基于Nextjs和Directus技术。帮助你更快速地构建各种类型的网站。</p>

<p align="center">
  <a href="#introduction"><strong>介绍/Introduction</strong></a> ·
  <a href="#installation-and-development"><strong>🚧 安装和开发/Installation and Development</strong></a> ·
  <!-- <a href="#deployment"><strong>🚢 部署/Deployment</strong></a> · -->
  <!-- <a href="#features"><strong>⭐ 特性/Features</strong></a> · -->
  <a href="#tech-stack"><strong>🧰 技术栈/Tech Stack</strong></a> ·
  <a href="#other-resources"><strong>💼 其他资源/Other Resources</strong></a> ·
  <a href="#contributors"><strong>👥 贡献者/Contributors</strong></a>
</p>
<br/>

<br />

# Introduction

Spin up a beautiful site in minutes. Or use Nextus as the foundation for your next awesome project.

在几分钟内建立一个漂亮的网站。或者使用Nextus作为您下一个出色项目的基础。

[**-> View The Demo Site(Demo网站)**](https://nextus.vercel.app/)

**Features(已支持特性)**

- Complete NextJs 13 website example(完整的NextJs 13 网站案例)
- Multi languages support, currenly en/zh. you can add more.(多语言支持，目前支持中文和英文，你可以自行添加更多。)
- Built-in Directus - Headless CMS support(内置Directus - 无头CMS支持)
- Tailwind CSS and Daisyui (使用Tailwind CSS 和 Daisyui完成主题开发)
- Dynamic Page Builder (M2A Interface) within Directus(在Directus中使用ManyToAny界面动态构建网页)
- Blog posts and categories(博客文章和分类)
- Projects pages(项目页面)
- Dynamic form generation with validation(动态生成带验证规则的表单)
- Dynamic social image generation(动态社交图片生成)
- SEO support(支持SEO)
- Global search component and API route (全局搜索组件和NextJs Api路由)
- Redirects module(重定向模块)
- Ready to use common components like modals, dropdowns, and file upload input(预制通用UI组件)
- Common utilities so you don't need to include yet another package (常用函数所以你不用包含其他额外第三方包)
- Easy SVG Icons using Iconify Icon module(通过Iconfy Icon库方便使用各种SVG图标)
- Google Fonts support(Google字体支持)
- ESLint and Prettier already configured(已经配置好了ESLint和Prettier)
- Many theme provided by Daisyui(通过Daisyui提供了很多主题)
- Written in Typescript and New Directus TS SDK(完全使用Typescript编写，并使用了最新的Directus Typescript SDK)

<br />

# Installation and Development

## Directus - Headless CMS

### 1 Setup Directus

Use [Directus Cloud](https://directus.cloud/register) or follow the [self-hosting](https://docs.directus.io/self-hosted/quickstart.html) tutorial provided by Directus to quickly set up your own instance of Directus.

Then, apply the data structure provided by Nextus using the Schema feature.

This way, your Nextus backend will be fully prepared.

使用[Directus Cloud](https://directus.cloud/register)或者根据Directus提供的[自行托管](https://docs.directus.io/self-hosted/quickstart.html)教程，快速搭建属于自己的Directus实例。

然后使用Schema功能应用Nextus所提供的数据结构。

这样，你的Nextus后端就完全准备好了。

---

## 2 Nextus - Frontend(前端)

Nextus is built using Next.js 13 on the front-end. All you need to do is fork a copy to your own Github account, connect it with Vercel, set up a few environment variables (for connecting with Directus), and your Nextus will be live.

Of course, you can also clone the repository locally and customize it according to your own needs.

Nextus前端使用Nextjs 13 构建，你需要做的就是fork一份到你自己的Github账户，然后与Vercel连接，设置几个环境变量（用于连接Directus），然后你的Nextus就上线了。

当然，你也可以克隆仓库到本地，然后根据你自己的需求进行二次开发。

## 3 Enjoy!

Now, you have a Nextus backend (built with Directus) and a Nextus frontend (built with Nextjs).

Start adding your own content in Nextus and experience the charm of headless CMS and modern frontend websites!

现在，你有了一个Nextus后端（使用Directus构建），也有了一个Nextus前端（使用Nextjs构建）。

开始开始在Nextus中添加属于你自己的内容并感受无头CMS和现代化前端网站带来的魅力吧！

<br />


# Tech Stack

## Next

Build your next Next.js application with confidence using Next. An open source framework under MIT license that makes web development simple and powerful. The leading React framework that handles routing, server side rendering, and more.

[Learn more about Next](https://nextjs.org)

---

## Directus

Directus is a headless CMS that instantly turns your SQL database into REST and GraphQL APIs and gives you a beautiful, intuitive no-code app to manage all your content and data.
But it's also more than just a headless CMS. It’s an open data platform that has all the tools you need for creating, managing, serving, visualizing, and even automating your data for your next web, mobile, or digital project.

For a smooth experience, the [Directus SDK](https://docs.directus.io/guides/sdk/getting-started.html) is already integrated for you and availably globally.

[Learn more about Directus](https://directus.io)

---

## UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework that allows you to rapidly build sites and maintain consistency across team members. There are several Tailwind Plugins installed and ready to use as well – [Typography](https://tailwindcss.com/docs/typography-plugin) and [Forms](https://tailwindcss.com/docs/plugins#forms).
- [Daisyui](https://daisyui.com/) – The most popular component library for Tailwind CSS.
- [React Hook Form](https://react-hook-form.com/) – Form library for React that saves you hours of time by simplifying form creation.
- [Iconify for React](https://github.com/iconify) - Modern unified SVG framework. One syntax for many icon sets: FontAwesome, Material Design Icons, Dashicons and many others. Over 150,000 icons, very easy to use

## Utilities

- [React-Use](https://github.com/streamich/react-use) – React Hooks — 👍
- [Framer-Motion](https://www.framer.com/motion/) – Framer Motion is a simple yet powerful motion library for React.

<br />

# Other Resources

- **[Directus Discord](https://discord.com/invite/directus)** – Join 10k+ developers and community members to ask questions and live discussion around Directus.
- **[Next Discord](https://discord.com/invite/bUG2bvbtHy)**

<br />

# Contributors

- 罗传月武 ([@luochuanyuewu](https://twitter.com/luochuanyuewu))

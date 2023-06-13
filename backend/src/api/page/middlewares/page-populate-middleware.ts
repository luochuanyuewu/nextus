"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  metadata: {
    populate: '*',
  },
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      buttons: {
        populate: true,
      },
      feature: {
        populate: {
          fields: ["title", "description", "showLink", "newTab", "url", "text"],
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      testimonials: {
        populate: {
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      plans: {
        populate: ["product_features"],
      },
      submitButton: {
        populate: true,
      },
    },
  },
};


export default (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate: { ...populate },
      filters: { slug: ctx.query.filters?.slug },
      locale: ctx.query.locale,
    };

    console.log("page-populate-middleware.ts: ctx.query = ", JSON.stringify(ctx.query));

    await next();
  };
}

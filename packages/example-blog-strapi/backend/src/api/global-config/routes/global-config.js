'use strict';

/**
 * global-config router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::global-config.global-config');

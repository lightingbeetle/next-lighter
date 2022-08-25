'use strict';

/**
 * global-config service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-config.global-config');

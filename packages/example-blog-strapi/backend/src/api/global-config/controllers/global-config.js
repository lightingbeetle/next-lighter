'use strict';

/**
 *  global-config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::global-config.global-config');

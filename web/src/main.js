/* ============
 * Main File
 * ============
 *
 * This will initialize the application.
 */
import Vue from 'vue'
import app from './app'
/* eslint-disable no-new */
require('./bootstrap')

new Vue(app).$mount('#app')

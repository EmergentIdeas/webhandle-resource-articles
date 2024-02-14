import webhandle from 'webhandle'
import express from 'express'
import path from 'path'

import ResourceArticlesDreck from './resource-articles-dreck.mjs'
import allowGroup from 'webhandle-users/utils/allow-group.js'

import filog from 'filter-log'
let log = filog('resource-articles-integrator:')

import ResourceArticlesDataService from './resource-articles-data-service.mjs'

let templatesAdded = false
let templates = {}

export default function integrate(dbName, options) {
	let opt = Object.assign({
		collectionName: 'resourcearticles',
		templateDir: 'node_modules/@webhandle/resource-articles/views',
		mountPoint: '/admin/resource-articles',
		allowedGroups: ['administrators']
	}, options || {})
	let collectionName = opt.collectionName


	// setup collections
	if (!webhandle.dbs[dbName].collections[collectionName]) {
		webhandle.dbs[dbName].collections[collectionName] = webhandle.dbs[dbName].db.collection(collectionName)
	}

	// Setup data service
	let dataService = new ResourceArticlesDataService({
		collections: {
			default: webhandle.dbs[dbName].collections[collectionName]
		}
	})
	webhandle.services.resourceArticles = dataService


	// setup admin gui tools
	let dreck = new ResourceArticlesDreck({
		dataService: dataService
	})

	let router = dreck.addToRouter(express.Router())
	
	if(opt.allowedGroups && opt.allowedGroups.length > 0) {
		let securedRouter = allowGroup(
			opt.allowedGroups,
			router
		)
		webhandle.routers.primary.use(opt.mountPoint, securedRouter)
	}
	else {
		// Use this for testing or when no group is needed to access
		webhandle.routers.primary.use(opt.mountPoint, router)
	}

	if(!templatesAdded) {
		templatesAdded = true

		// add templates directory
		if (opt.templateDir) {
			webhandle.addTemplateDir(path.join(webhandle.projectRoot, opt.templateDir))
		}

		// webhandle.templateLoaders.push((name, callback) => {
		// 	callback(templates[name])
		// })

	}
}

integrate.templates = templates

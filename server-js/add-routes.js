
import path from "path"
import express from "express"
import filog from "filter-log"
import loadTemplates from "./add-templates.js"
import webhandle from "webhandle"
import enableResourceArticles from "./setups/enable-resource-articles.mjs"
import enablePageEditor from "./setups/enable-page-editor.mjs"

let log

export default function(app) {
	let firstDb = Object.keys(webhandle.dbs)[0]
	let dbName = firstDb || "unknowndb"
	log = filog('resource-articles')

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	loadTemplates()
	
	webhandle.routers.preStatic.get(/.*\.cjs$/, (req, res, next) => {
		console.log('cjs')
		res.set('Content-Type', "application/javascript")
		next()
	})

	enableResourceArticles(dbName, {
		templateDir: null
		, allowedGroups: []
	})
	
	enablePageEditor()
}


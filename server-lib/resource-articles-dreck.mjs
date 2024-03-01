import Dreck from 'dreck'
import addCallbackToPromise from 'add-callback-to-promise'

import simplePropertyInjector from 'dreck/binders/simple-property-injector.js'
import createValuedCheckboxInjector from 'dreck/binders/create-valued-checkbox-injector.js'

import wh from 'webhandle'

export default class ResourceArticlesDreck extends Dreck {
	constructor(options) {
		super(options)
		let curDreck = this
		Object.assign(this, 
			{
				templatePrefix: 'resource-articles/resource-articles/',
				locals: {
					pretemplate: 'app_pre',
					posttemplate: 'app_post'
				},
				injectors: [
					(req, focus, next) => {
						simplePropertyInjector(req, focus, curDreck.bannedInjectMembers, next)
					}
					, createValuedCheckboxInjector('resource-articles')
				]
			}
		)
	}
	addAdditionalFormInformation(focus, req, res, callback) {
		let p = new Promise(async (resolve, reject) => {

			if(wh.services.author) {
				res.locals.authors = await wh.services.author.fetch({})
			}
			if(wh.services.hierarchies) {
				res.locals.hierarchy = (await wh.services.hierarchies.fetch({name: 'resource-articles'}))[0]
			}
			// let groups = await wh.services.sponsorgroups.fetch()
			// res.locals.groups = groups
			resolve(focus)
		})
		
		return addCallbackToPromise(p, callback)
	}
}

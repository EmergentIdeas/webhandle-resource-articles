let initialized = false
import resourceArticlesIntegrator from "../../server-lib/resource-articles-integrator.mjs"
export default function enableResourceArticles(dbName, options) {
	if (!initialized) {
		initialized = true
		resourceArticlesIntegrator(dbName, options)
	}
}


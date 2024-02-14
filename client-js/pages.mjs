
import UploadableImage from 'ei-pic-browser/uploadable-image.js'
import resourceArticlesIntegrator from "../client-lib/resource-articles-integrator.mjs"
resourceArticlesIntegrator()

window.CKEDITOR_BASEPATH = '/ckeditor/'

async function appSetup() {


	// custom config
    CKEDITOR.config.customConfig = '/webhandle-page-editor/std-config.js' 
	
	let pics = document.querySelectorAll('.article-resources-fields-form input[type="text"].picture-input-field')
	for(let pic of pics) {
		new UploadableImage(pic)
	}
	// require('webhandle-page-editor/app-client')

}

if(window.CKEDITOR) {
	appSetup()
}
else {
	let ckscript = document.createElement('script');
	ckscript.setAttribute('src','/ckeditor/ckeditor.js');
	ckscript.onload = function() {
		appSetup()
	}
	document.head.appendChild(ckscript)
}

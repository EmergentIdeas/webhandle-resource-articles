# Add resource articles to a webhandle environment

## Install

```
npm install @webhandle/resource-articles
```

Add to less: 
```
@import "../node_modules/@webhandle/resource-articles/less/components";
```

Add to client js:

```
let resourceArticles = require('@webhandle/resource-articles').default
resourceArticles()
```

Add to server js:
```
const articlesIntegrator = (await import('@webhandle/resource-articles')).default
articlesIntegrator (dbName)
```

By default, the urls are:

/admin/resource-articles

Services are:
- resourceArticles

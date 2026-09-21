# BeFirst SEO — Fix Specifications (from HuggingFace Audit)

## Issues Found

### 1. Client-Side Rendering (CRITICAL)
- Every URL returns identical HTML with same title tag
- Crawlers see empty `<div id="root"></div>` shells
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't run JS — they see nothing
- The robots.txt invitation to AI crawlers is wasted

### 2. Sitemap Mismatch
- `robots.txt` points to `seo_sitemap.xml` 
- GSC may have `sitemap.xml` submitted — causes "Couldn't fetch"
- Need to standardize to `sitemap.xml`

### 3. Footer Bug
- Line 461: `BeFirst (<img class="foot-logo" src="BF_Logo_Reference.svg" alt="B&F logo">), be first on Google`
- In some contexts renders as `BeFirst ()` with empty parentheses

### 4. Debug Block
- Line 576: `<details class="app-details"><summary>Raw Data</summary><pre id="rawData"></pre></details>`
- Renders on live site with empty code fence

### 5. Zero Stat Counters
- Homepage shows `0 SEO checks per audit · 0 seconds · 0% free`
- Pre-animation values captured in snapshot

### 6. No Custom Domain
- `.netlify.app` subdomains are weakly indexed
- Need custom domain (befirstseo.com or .in)

### 7. _redirects Issue
- Current: `/* /index.html 200` — blanket SPA catch-all
- Should only catch routes that don't match real files

## Fix Plan

### Phase 1: Critical Fixes (Do First)
1. Fix _redirects — proper SPA routing
2. Fix sitemap.xml — standardize path, add lastmod
3. Fix robots.txt — point to /sitemap.xml
4. Fix footer bug
5. Remove debug "Raw Data" block
6. Add 404.html page

### Phase 2: Content Fixes
1. Fix stat counters (show real numbers)
2. Add proper navigation links
3. Update canonical URLs

### Phase 3: Deployment
1. Push changes to Netlify
2. Update GSC sitemap submission
3. Verify rendering

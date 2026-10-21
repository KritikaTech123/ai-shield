import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch({args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const results={};
try {
  for(const route of ['/','/dashboard','/dashboard?view=agents','/dashboard?view=tests','/dashboard?view=findings','/dashboard?view=reports','/dashboard?view=library','/dashboard?view=settings','/login?mode=signup','/docs','/dashboard#dark']){
    await page.goto((process.env.TEST_BASE_URL||'http://localhost:3000')+route,{waitUntil:'networkidle'});
    if(route.startsWith('/dashboard'))await page.locator('.dashboard-main .dash-card').first().waitFor();
    if(route.endsWith('#dark'))await page.getByRole('button',{name:'Switch to dark mode'}).click();
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    results[route]=result.violations;
    console.log(route,JSON.stringify(result.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,samples:v.nodes.slice(0,7).map(n=>({target:n.target,summary:n.failureSummary}))}))));
  }
  await mkdir('test-results',{recursive:true});
  await writeFile('test-results/accessibility.json',JSON.stringify(results,null,2));
} finally { await browser.close(); }

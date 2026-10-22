// Edit assets/program-order.json, then run: node scripts/sync-program-order.cjs
// Generated inline copies keep navigation synchronous: no runtime JSON requests.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const order = JSON.parse(read('assets/program-order.json'));
if (!order.length || new Set(order).size !== order.length || order.includes('gostbundle')) {
  throw new Error('Program order must contain unique program IDs, without gostbundle');
}
const check = process.argv.includes('--check');
let stale = false;
function write(file, value) {
  if (read(file) === value) return;
  if (check) { console.error('Out of sync: ' + file); stale = true; }
  else fs.writeFileSync(path.join(root, file), value);
}
const catalog = read('index.html');
const productText = catalog.split('const PRODUCTS = ')[1].split('const VERSION_ICONS')[0];
const products = vm.runInNewContext('(' + productText.slice(0, productText.lastIndexOf(';')) + ')');
const garland = read('assets/program-garland.js');
const registry = vm.runInNewContext('(' + garland.split('const PRODUCTS = ')[1].split('// BEGIN GENERATED PROGRAM ORDER')[0].trim().replace(/;$/, '') + ')');
for (const id of order) {
  if (!registry[id] || !products.some(product => product.id === id)) throw new Error('Missing metadata: ' + id);
}
const generated = '// BEGIN GENERATED PROGRAM ORDER\n  const GLOBAL_PROGRAM_ORDER = ' + JSON.stringify(order, null, 2).replace(/\n/g, '\n  ') + ';\n  // END GENERATED PROGRAM ORDER';
const sync = text => text.replace(/\/\/ BEGIN GENERATED PROGRAM ORDER[\s\S]*?\/\/ END GENERATED PROGRAM ORDER/, generated);
write('assets/program-garland.js', sync(garland));
let nextCatalog = sync(catalog);
nextCatalog = nextCatalog.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (match, json) => {
  const schema = JSON.parse(json);
  if (schema['@type'] !== 'ItemList') return match;
  schema.itemListElement = [...order, 'gostbundle'].map((id, index) => {
    const product = products.find(product => product.id === id);
    if (!product) throw new Error('Missing catalog metadata: ' + id);
    const page = product.links.page;
    return { '@type': 'ListItem', position: index + 1, url: typeof page === 'string' ? page : page.ru, name: product.titles.ru + ' / ' + product.titles.en };
  });
  return '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 2) + '\n</script>';
});
write('index.html', nextCatalog);
// Kept as a compatible static snapshot; PRS no longer fetches or renders it.
const legacy = JSON.parse(read('prs/assets/programs.json'));
const legacyById = new Map(legacy.map(product => {
  const id = product.id || (product.current ? 'prs' : product.icon.match(/icon-([^.]+)/)?.[1]);
  return [id, product];
}));
const prsOrder = ['prs', ...order.filter(id => id !== 'prs')];
write('prs/assets/programs.json', JSON.stringify(prsOrder.map(id => {
  const product = legacyById.get(id) || registry[id];
  return { ...product, id, ...(id === 'prs' ? {current: true} : {}) };
}), null, 2) + '\n');
const version = '20261022-global-' + crypto.createHash('sha256').update(JSON.stringify(order)).digest('hex').slice(0, 8);
let pages = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), {withFileTypes: true})) {
    if (entry.name === '.git') continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const source = read(file);
      if (!source.includes('/assets/program-garland.js')) continue;
      pages++;
      let next = source.replace(/https:\/\/governorv\.github\.io(?=\/assets\/program-garland\.js)/g, '').replace(/(src=["'][^"']*\/assets\/program-garland\.js)(?:\?[^"']*)?(["'])/g, '$1?v=' + version + '$2');
      if (file.replace(/\\/g, '/') === 'prs/index.html') next = next.replace('src="assets/site.js"', 'src="assets/site.js?v=' + version + '"');
      write(file, next);
    }
  }
}
walk('');
if (stale) process.exitCode = 1;
else console.log(`${order.length} programs; ${pages} product pages synchronized; catalog, schema and PRS snapshot match.`);

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const expected = JSON.parse(read('assets/program-order.json'));
const source = read('assets/program-garland.js');
const routes = vm.runInNewContext('(' + source.split('const ROUTES = ')[1].split('const PLACEMENT')[0].trim().replace(/;$/, '') + ')');
class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.dataset = {}; this.attributes = {}; this.style = {}; }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.append(node); }
  replaceChildren(...nodes) { this.children = nodes; }
  setAttribute(key, value) { this.attributes[key] = value; }
}
let tested = 0;
for (const [route, current] of Object.entries(routes)) {
  for (const lang of ['ru', 'en']) {
    const elements = new Map(); const anchor = new Element('section');
    anchor.insertAdjacentElement = (_, node) => elements.set(node.id, node);
    const doc = {
      documentElement: { dataset: {lang}, lang }, head: new Element('head'),
      createElement: tag => new Element(tag), getElementById: id => elements.get(id),
      querySelectorAll: selector => selector === 'main[data-lang]' ? [] : [anchor], addEventListener() {}
    };
    let rerender;
    const context = vm.createContext({document: doc, navigator: {language: lang}, URLSearchParams,
      window: {location: {pathname: '/' + route + '/', search: '?lang=' + lang, hash: '', origin: 'https://governorv.github.io'}, addEventListener() {}, setTimeout: fn => fn()},
      MutationObserver: class { constructor(callback) { rerender = callback; } observe() {} }
    });
    vm.runInContext(source, context);
    const track = elements.get('pt-program-garland').children[0];
    const ids = () => track.children.map(link => link.dataset.program);
    const order = [current, ...expected.filter(id => id !== current)];
    assert.deepEqual(ids(), order, route + ':' + lang);
    assert.equal(track.children[0].attributes['aria-current'], 'page');
    assert.equal(track.children[0].children[0].width, 72);
    for (const link of track.children) {
      assert.ok(link.href.startsWith('https://governorv.github.io/'));
      assert.equal(link.target, '_blank');
      const iconPath = new URL(link.children[0].src).pathname;
      assert.ok(fs.existsSync(path.join(root, decodeURIComponent(iconPath))), iconPath);
    }
    doc.documentElement.dataset.lang = lang === 'ru' ? 'en' : 'ru'; rerender();
    assert.deepEqual(ids(), order, 'Language switch: ' + route);
    vm.runInContext(source, context); // Accidental duplicate inclusion must not create another garland.
    assert.equal(elements.size, 1);
    tested++;
  }
}
const catalog = read('index.html');
const productText = catalog.split('const PRODUCTS = ')[1].split('const VERSION_ICONS')[0];
const products = vm.runInNewContext('(' + productText.slice(0, productText.lastIndexOf(';')) + ')');
const catalogContext = vm.createContext({PRODUCTS: products, GLOBAL_PROGRAM_ORDER: expected});
const sort = catalog.slice(catalog.indexOf('    const cardOrder ='), catalog.indexOf('    for (const p of cardOrder)'));
assert.deepEqual(Array.from(vm.runInContext(sort + 'cardOrder.map(p => p.id)', catalogContext)), [...expected, 'gostbundle']);
assert.ok(!catalog.includes('card.style.order'));
const schema = JSON.parse(catalog.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema.itemListElement.length, 23);
assert.deepEqual(schema.itemListElement.map(item => item.position), Array.from({length:23}, (_, i) => i + 1));
for (let i = 0; i < expected.length; i++) {
  assert.equal(schema.itemListElement[i].url, products.find(product => product.id === expected[i]).links.page.ru);
}
assert.ok(!read('prs/assets/site.js').includes('programs.json'));
assert.ok(!read('prs/index.html').includes('id="garland"'));
assert.deepEqual(JSON.parse(read('prs/assets/programs.json')).map(p => p.id), ['prs', ...expected.filter(id => id !== 'prs')]);
console.log(`PASS: ${tested} route/language renderings, language switching, active icon, no duplicates, icons/links, catalog and schema, PRS.`);

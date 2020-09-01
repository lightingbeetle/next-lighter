import { promises as fs } from 'fs';
import path from 'path';
import {
  findPort,
  killApp,
  launchApp,
  nextBuild,
  nextExport,
  renderViaHTTP,
} from '../utils';
import { join } from 'path';
import cheerio from 'cheerio';

jest.setTimeout(1000 * 60 * 5);

let app;
let appPort;
const appDir = join(__dirname, '../../');
const outdir = join(appDir, 'out');

function runTests() {
  it('should ssr page /', async () => {
    const html = await renderViaHTTP(appPort, '/');
    const $ = cheerio.load(html);
    expect($('h1').text()).toBe('Hello world!');
  });
}
describe('nested index.js', () => {
  describe('dev mode', () => {
    beforeAll(async () => {
      appPort = await findPort();
      app = await launchApp(appDir, appPort);
    });
    afterAll(() => killApp(app));

    runTests();
  });

  describe('export mode', () => {
    beforeAll(async () => {
      await nextBuild(appDir);
      await nextExport(appDir, { outdir });
    });

    it('should ssr page index.html', async () => {
      expect(
        await fs
          .access(path.join(outdir, 'index.html'))
          .then(() => true)
          .catch(() => false)
      ).toBe(true);
    });
  });
});

import { promises as fs } from 'fs';
import path from 'path';
import { renderViaHTTP } from '../utils';
import cheerio from 'cheerio';

jest.setTimeout(1000 * 60 * 5);

function runTests(appPort) {
  it('should ssr', async () => {
    const html = await renderViaHTTP(appPort, '/');
    const $ = cheerio.load(html);
    expect($('h1').text()).toBe('Hello world!');
  });
}

describe('page /', () => {
  describe('dev mode', () => {
    runTests(global.devAppPort);
  });

  describe('production mode', () => {
    runTests(global.appPort);
  });

  describe('export mode', () => {
    it('should ssr page index.html', async () => {
      expect(
        await fs
          .access(path.join(global.outDir, 'index.html'))
          .then(() => true)
          .catch(() => false)
      ).toBe(true);
    });
  });
});

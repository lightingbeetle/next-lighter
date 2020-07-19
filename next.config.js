const frontMatterToMDXRemarkPlugin = require('./utils/frontMatterToMDXRemarkPlugin');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontMatterToMDXRemarkPlugin],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
});

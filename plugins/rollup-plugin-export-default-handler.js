// We prefix the polyfill id with \0 to tell other plugins not to try to load or
// transform it

export default function exportDefaultHandler() {
  return {
    name: 'export-default-handler',
    /**
     * @param {string} code
     * The current bundle code.
     *
     * @param {object} chunk
     * The chunk data.
     *
     * @return {string} code
     * The modified code.
     */
    renderChunk: async (code, chunk) => {
      if (chunk.exports.includes('default')) {
        const oldDefaultExport = `export { ${chunk.name} as default };`;
        const newDefaultExport = `export default ${chunk.name};`;
        return code.replace(oldDefaultExport, newDefaultExport);
      }
      return null;
    },
  };
}

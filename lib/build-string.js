const cheerio = require('cheerio');
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

async function buildString(prefix, input, quiet = false) {
  /**
   * Search HTML elements starting with "language-viz-" as className.
   */
  const $ = cheerio.load(input);
  const nodes = $(`[class^=${prefix}]`);

  /**
   * Render each element found in the input.
   */
  for (var i = 0; i < nodes.length; i++) {
    try {
      const $x = $(nodes[i]);

      var engine;
      $x.attr("class").split(" ").forEach(function(cls) {
        if (cls.startsWith(prefix)) {
          engine = cls.substr(prefix.length);
        }
      });

      /**
       * Render the graph as a svg.
       */
      const viz = new Viz({ Module, render });
      const options = {format: "svg", engine: engine};
      const result = await viz.renderString($x.text(), options);

      /**
       * Make sure that there is one root element before searching svg element.
       * This trick remove wrapping comments produced by Viz.js.
       */
      const wrappedContent = `<div>${result}</div>`;
      const $svg = $(wrappedContent).find("svg");
      $svg.addClass("viz-svg");

      /**
       * Finaly replace current element by the svg graph.
       */
      $x.replaceWith($svg);
    } catch (err) {
      /**
       * Print Viz.js error.
       */
      if (!quiet) {
        console.log(`Viz.js: ${err}`);
      }
    }
  }

  /**
   * Return html result.
   */
  const html = $.html();
  return html;
}

module.exports = buildString;

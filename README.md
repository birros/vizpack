# Vizpack

Transform all HTML elements containing a graph description, from a HTML page, to
SVG elements using [Viz.js].

## Installation

Install with [npm]:

    $ npm install vizpack

## Usage

Command-line interface:

```
NAME:
    vizpack

SYNOPSIS:
    vizpack [options...] prefix input output

DESCRIPTION:
    Transform all HTML elements containing a graph description and whose class
    name starts with prefix to SVG elements using Viz.js.

OPTIONS:
    -V, --version  output the version number
    -q, --quiet    render silently
    -h, --help     output usage information

EXAMPLES:
    $ vizpack --quiet "language-viz-" input.html output.html
```

<!-- Links -->

[Viz.js]: https://github.com/mdaines/viz.js
[npm]: https://en.wikipedia.org/wiki/Npm_(software)

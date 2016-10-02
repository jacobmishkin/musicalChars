# musicalChars

----

🎵 Generate music from the rss or atom feed of a public code repository.

----

### todo:

- Work on defining values to be used by Tone.js by performing various counts and calculations from the repo data
- Map the speech synthesis pitch ranges to musical note equivalents
- Should we use Github auth? I've hit the ceiling on the public API rate limit several times already.
- diugdfu

----

### Installation:

- `npm i && say -v "Zarvox" "THE BUILD HAS BEEN COMPLETED"`

### Build:

- `js` working dir is `src/js/dev/`. Compiles to minified version in `build`.
- `scss` working dir is `src/scss/`. Compiles to minified version in `build`.
- js dependencies dir is `src/js/vendor/`. Deps are presently Tone.js and a new library which isn't that popular but I like it, it's called jQuery.
- `commonꜷ` utility/tools dir is `src/js/utility/`. The thinking on that was that maybe it gradually becomes a file that's dropped into every project. Time savers, loggers, factories, etc. Just the `console.au()` thing in there now. Will likely add a debug stepper/tracer/breaker and/or some abstraction of the performance timing API if things get resource-heavy.

- `gulp` for everything, or `gulp js|gulp styles`
- [x] add `babelrc`
### Usage:

- Soon! We're not done quite yet.


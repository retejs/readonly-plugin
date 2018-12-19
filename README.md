Rete readonly plugin
====
#### Rete.js plugin

```js
import ReadonlyPlugin from 'rete-readonly-plugin';

 // the plugin creates a 'readonly' and 'isreadonly' events

editor.use(ReadonlyPlugin, { enabled: false }); // enabled is true by default

this.emitter.exist('isreadonly') // check if event exist, i.e. plugin installed

let readonlyEnabled = editor.trigger('isreadonly'); // get readonly state

editor.trigger('readonly', readonlyEnabled); // enable or disable readonly

editor.on('readonly', () => {}) // side effects when turning on / off the read-only mode
```



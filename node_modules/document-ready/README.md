# document-ready

Dependency free jQuery document ready method in ES6 module

## installation

Install directly from git

```bash
npm install kociolekt/document-ready
```

## usage
Import and invoke

```javascript
import ready from 'kociolekt/document-ready';

ready(() => {
  document.body.appendChild(document.createElement('span'));
});
```

This is [on GitHub](https://github.com/kociolekt/document-ready) so let me know if I've b0rked it somewhere.

# underdog-mocha-react

Utilities for testing React applications with Mocha. Includes [enzyme](https://www.npmjs.com/package/enzyme), [jsdom](https://www.npmjs.com/package/jsdom), and [react-addons-test-utils](https://www.npmjs.com/package/react-addons-test-utils).

## Usage

1. Install with npm.

  ```bash
  npm install underdog-mocha-react --save
  ```

2. Import and use in your test.

  ```jsx
  import React from 'react';
  import assert from 'assert';
  import reactUtils from 'underdog-mocha-react';

  describe('A sufficiently thorough test', function () {
    // Injects a helper method for rendering elements with enzyme.mount, this.render().
    // Also creates a fake dom with jsdom, accessible from global.window.
    reactUtils();

    it('confirms all the things', function () {
      // Render component with this.render() to get an Enzyme wrapper via enzyme.mount().
      const wrapper = this.render(
        <a href="/test">Hey there</a>
      );

      // You also get a fake window object for your tests.
      // This is useful for simulating events with wrapper.find('...').simulate().
      assert.notEqual(typeof window, 'undefined');
    });
  });
  ```

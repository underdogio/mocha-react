const {JSDOM} = require('jsdom');
const {mount} = require('enzyme');

module.exports = function mochaReactUtils ({domMarkup} = {}) {
  before(function () {
    // Create a fake dom before starting tests
    global.window = new JSDOM(domMarkup).window;
    global.document = window.document;

    // Add helper function for rendering a react element
    this.render = function (element) {
      return mount(element);
    };
  });

  after(function () {
    // Tear down fake dom once tests are complete
    delete global.window;
    delete global.document;
  });
}

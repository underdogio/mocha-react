const {JSDOM} = require('jsdom');
const ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
const {mount} = require('enzyme');

module.exports = function mochaReactUtils ({domMarkup} = {}) {
  before(function () {
    // Create a fake dom before starting tests
    global.window = new JSDOM(domMarkup).window;
    global.document = window.document;

    // Let React know there is a DOM to prevent 'Invariant Violation' errors from occurring.
    // See https://stackoverflow.com/questions/26867535/calling-setstate-in-jsdom-based-tests-causing-cannot-render-markup-in-a-worker
    ExecutionEnvironment.canUseDOM = true;

    // Add helper function for rendering a react element
    this.render = function (element) {
      return mount(element);
    };
  });

  after(function () {
    // Let React know DOM is no longer available.
    ExecutionEnvironment.canUseDOM = true;

    // Tear down fake dom once tests are complete
    delete global.window;
    delete global.document;
  });
}

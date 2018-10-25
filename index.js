const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
const {JSDOM} = require('jsdom');
const {mount} = require('enzyme');

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

module.exports = function mochaReactUtils ({domMarkup} = {}) {
  before(function () {
    // Create a fake dom before starting tests
    global.window = new JSDOM(domMarkup).window;
    global.document = window.document;
    global.navigator = window.navigator;

    // Mock request animation frame. Invoke passed function immediately.
    global.requestAnimationFrame = (fn) => fn();

    // Let React know there is a DOM to prevent 'Invariant Violation' errors from occurring.
    // See https://stackoverflow.com/questions/26867535/calling-setstate-in-jsdom-based-tests-causing-cannot-render-markup-in-a-worker
    ExecutionEnvironment.canUseDOM = true;
  });

  after(function () {
    // Let React know DOM is no longer available.
    ExecutionEnvironment.canUseDOM = false;

    // Tear down fake dom once tests are complete
    delete global.window;
    delete global.document;
    delete global.navigator;
    delete global.requestAnimationFrame;
  });

  // Create helper function for rendering a react element
  const render = function (element) {
    return mount(element);
  };

  // Helper for simulating DOM events
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
  // eventTarget: The node to simulate the event for
  // eventType: The type of the event ('scroll', 'click', etc)
  const simulateDOMEvent = function (eventTarget, eventType, eventData) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(eventType, true, true);
    Object.keys(eventData).forEach((key) => {
      event[key] = eventData[key];
    });
    eventTarget.dispatchEvent(event);
  }

  return {
    render,
    simulateDOMEvent
  }
}

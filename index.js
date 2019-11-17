const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const {mount} = require('enzyme');
const jsdom = require("mocha-jsdom")

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

module.exports = function mochaReactUtils ({domMarkup, options = {
  url: 'http://localhost',
  pretendToBeVisual: true,
}} = {}) {
  jsdom(options)

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
    render: mount,
    simulateDOMEvent
  }
}

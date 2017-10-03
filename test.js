const React = require('react');

const reactUtils = require('./');

function TestComponent () {
  return (
    <div className="test-component">Hi!</div>
  );
}

describe('An example test', function () {
  const {render} = reactUtils();

  it('passes', function () {
    const wrapper = render(<TestComponent />);
    expect(wrapper.text()).toContain('Hi!');
  });
});

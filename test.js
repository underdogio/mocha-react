const React = require('react');
const expect = require('expect');
const {spy} = require('sinon');

const reactUtils = require('./');

function TestComponent ({onClick}) {
  return (
    <button className="test-button" onClick={onClick}>Hi!</button>
  );
}

describe('An example test', function () {
  const {render} = reactUtils();

  it('passes', function () {
    const onClick = spy();
    const wrapper = render(<TestComponent onClick={onClick} />);
    const button = wrapper.find('.test-button');
    expect(button.text()).toContain('Hi!');
    button.simulate('click');
    expect(onClick.callCount).toEqual(1);
  });
});

const ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
const React = require('react');
const expect = require('expect');
const {spy} = require('sinon');

const reactUtils = require('./');

class TestComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      message: 'Hi!'
    };

    this.onClick = this.onClick.bind(this);
  }

  render () {
    const {message} = this.state;

    return (
      <button className="test-button" onClick={this.onClick}>{message}</button>
    );
  }

  onClick () {
    this.props.onMessageChange();
    this.setState({
      message: 'Bye!'
    });
  }
}

describe('Exports', function () {
  const {render, simulateDOMEvent} = reactUtils();

  it('expected objects', function () {
    expect(render).toBeA('function');
    expect(simulateDOMEvent).toBeA('function');
  });
});

describe('An example test', function () {
  const {render} = reactUtils();

  it('creates a fake browser environment', function () {
    expect(window).toNotBeAn('undefined');
    expect(document).toNotBeAn('undefined');
    expect(requestAnimationFrame).toBeA('function');
    expect(ExecutionEnvironment.canUseDOM).toEqual(true);
  });

  it('returns an enzyme wrapper', function () {
    const onMessageChange = spy();
    const wrapper = render(<TestComponent onMessageChange={onMessageChange} />);
    const button = wrapper.find('.test-button');
    expect(button.text()).toContain('Hi!');
    button.simulate('click');
    expect(button.text()).toContain('Bye!');
    expect(onMessageChange.callCount).toEqual(1);
  });
});

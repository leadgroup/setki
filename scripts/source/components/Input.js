import React from 'react';
import Formsy from 'formsy-react';

const Input = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  render() {
    let className = 'form-element__input';
    if (this.showRequired() || this.showError()) {
      className += ' invalid';
    }
    return (
      <input
        className={className}
        type="text"
        value="container"
        name={this.props.name}
        onChange={this.changeValue}
        value={this.getValue()}
      />
    );
  }
});

export default Input;

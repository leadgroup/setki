import React from 'react';
import Formsy from 'formsy-react';

const RadioGroup = React.createClass({
  mixins: [Formsy.Mixin],

  componentDidMount() {
    const value = this.props.value;
    this.setValue(value);
    this.setState({ value });
  },

  changeValue(value) {
    this.setValue(value);
    this.setState({ value });
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const { name, title, items } = this.props;
    return (
      <span className={className}>
        {items.map((item, i) => (
          <label key={i} className="radio-item">
            <input
              className="radio-item__input"
              type="radio"
              name={name}
              onChange={this.changeValue.bind(this, item)}
              checked={this.state.value === item}
            />
            <span className="radio-item__icon"></span>
            <span className="radio-item__label">{item.toString()}</span>
          </label>
        ))
        }
      </span>
    );
  }

});

export default RadioGroup;

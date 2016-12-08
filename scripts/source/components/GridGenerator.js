import React from 'react';
import Formsy from 'formsy-react';
import CSSGrid from './CSSGrid';
import Input from './Input';
import RadioGroup from './RadioGroup';
import MultiCheckboxSet from './MultiCheckboxSet';
import jump from 'jump.js';

const defaultBreakpoints = [
  { name: 'xs', minWidth: '0', containerWidth: '100%' },
  { name: 'sm', minWidth: '768', containerWidth: '750px' },
  { name: 'md', minWidth: '992', containerWidth: '970px' },
  { name: 'lg', minWidth: '1200', containerWidth: '1170px' },
];

export default class GridGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      breakpointsNumber: 4,
      grid: null,
    };
  }
  handleFormSubmit(data) {
    const grid = {
      containerClassName: data.containerClassName,
      rowClassName: data.rowClassName,
      columnClassName: data.columnClassName,
      columnPushClassName: data.columnPushClassName,
      columnPullClassName: data.columnPullClassName,
      columnOffsetClassName: data.columnOffsetClassName,
      columnsNumber: parseInt(data.columnsNumber),
      gutterWidth: parseInt(data.gutterWidth),
      breakpointsNumber: data.breakpointsNumber,
      breakpoints: [],
      indent: data.indent,
      minify: data.additional[0],
      includeBoxSizing: data.boxSizing[0],
    };
    for (let i = 1; i <= data.breakpointsNumber; i++) {
      grid.breakpoints.push({
        name: data[`breakpoint-${i}-name`],
        minWidth: data[`breakpoint-${i}-minWidth`],
        containerWidth: data[`breakpoint-${i}-containerWidth`],
      });
    }
    this.setState({ grid });
    jump('#app', { duration: 400 });
  }
  handleFormBecomeValid() {
    this.setState({ isFormValid: true });
  }
  handleFormBecomeInvalid() {
    this.setState({ isFormValid: false });
  }
  handleBreakpointsNumberChange(event) {
    this.setState({ breakpointsNumber: event.target.value });
  }
  render() {
    const breakpoints = [];
    for (let i = 1; i <= this.state.breakpointsNumber; i++) {
      breakpoints.push(
        <div key={i} className="form-section">
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Breakpoint name #{i}:
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input name={`breakpoint-${i}-name`} className="form-element__input" type="text" value={ defaultBreakpoints[i - 1] ? defaultBreakpoints[i - 1].name : '' } required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Min-width:
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input name={`breakpoint-${i}-minWidth`} className="form-element__input" type="text" value={ defaultBreakpoints[i - 1] ? defaultBreakpoints[i - 1].minWidth : ''} required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Container width:
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input name={`breakpoint-${i}-containerWidth`} className="form-element__input" type="text" value={ defaultBreakpoints[i - 1] ? defaultBreakpoints[i - 1].containerWidth  : ''} required />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <Formsy.Form
          className="col-lg-8"
          onValidSubmit={this.handleFormSubmit.bind(this)}
          onValid={this.handleFormBecomeValid.bind(this)}
          onInvalid={this.handleFormBecomeInvalid.bind(this)}
        >
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Container
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="containerClassName" type="text" value="container" required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Row
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="rowClassName" type="text" value="row" required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Column
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="columnClassName" type="text" value="col-${breakpointName}-${columnsNumber}" required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Column pull
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="columnPullClassName" type="text" value="col-${breakpointName}-pull-${columnsNumber}" required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Column push
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="columnPushClassName" type="text" value="col-${breakpointName}-push-${columnsNumber}" required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Column offset
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="columnOffsetClassName" type="text" value="col-${breakpointName}-offset-${columnsNumber}" required />
            </div>
          </div>
          <p className="form-title">
            Grid Parameters:
          </p>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Columns number:
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input
                className="form-element__input"
                name="columnsNumber"
                type="text"
                value="12"
                validations={{ matchRegexp: /^\+?[1-9]\d*$/ }}
                required
              />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Gutter width:
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input className="form-element__input" name="gutterWidth" type="text" value="30" required />
            </div>
          </div>
          <div className="form-element row">
            <div className="form-element__label col-lg-4">
              Breakpoints number:
            </div>
            <div className="form-element__input-container col-lg-8">
              <Input
                className="form-element__input"
                onChange={this.handleBreakpointsNumberChange.bind(this)}
                name="breakpointsNumber"
                type="text"
                value="4"
                required
              />
            </div>
          </div>
          {breakpoints}
          {/*<div className="form-section">
            <div className="form-element row">
              <div className="form-element__label col-lg-4">
                Breakpoint name:
              </div>
              <div className="form-element__input-container col-lg-8">
                <Input className="form-element__input" type="text" value="xs" />
              </div>
            </div>
            <div className="form-element row">
              <div className="form-element__label col-lg-4">
                Min-width:
              </div>
              <div className="form-element__input-container col-lg-8">
                <Input className="form-element__input" type="text" value="768" />
              </div>
            </div>
            <div className="form-element row">
              <div className="form-element__label col-lg-4">
                Container width:
              </div>
              <div className="form-element__input-container col-lg-8">
                <Input className="form-element__input" type="text" value="100%" />
              </div>
            </div>
          </div>*/}
          <p className="form-title">
            Intend:
            <RadioGroup
              name="indent"
              value="2 spaces"
              items={['2 spaces', '4 spaces', 'tab']}
            />
          </p>
          <label className="form-title">
            Minify:
            <MultiCheckboxSet name="additional"
              cmp={(a, b) => JSON.stringify(a) === JSON.stringify(b)}
              items={['Minify']}
            />
          </label>
          <label className="form-title">
            Include box-sizing <small>(recommended)</small>:
            <MultiCheckboxSet name="boxSizing"
              cmp={(a, b) => JSON.stringify(a) === JSON.stringify(b)}
              items={['box-sizing']}
            />
          </label>
          <button className="primary-button" type="submit" disabled={!this.state.isFormValid}>
            Generate CSS
          </button>
        </Formsy.Form>
        <div className="col-lg-4">
          { this.state.grid ? <CSSGrid {...this.state.grid} /> : null }
        </div>
      </div>
    );
  }
}

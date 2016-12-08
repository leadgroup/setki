import React from 'react';
import cssbeautify from 'cssbeautify';

const cssshrink = require('cssshrink');

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

export default class CSSGrid extends React.Component {
  getAllColumnClassNames() {
    let result = '';
    this.props.breakpoints.forEach((breakpoint) => {
      result = result + `${this.getColumnClassNamesForBreakpoint(breakpoint)},`;
    });
    return result.slice(0, -1);
  }
  getColumnClassName(classScheme, breakpointName, columnsNumber = 0) {
    let className = `.${classScheme}`;
    className = className.replace('${breakpointName}', breakpointName);
    className = className.replace('${columnsNumber}', columnsNumber);
    return className;
  }
  getBreakpointColumnSizes(breakpoint, columnsNumber, columnClassName) {
    let result = '';

    // column
    for (let i = columnsNumber; i > 0; i--) {
      result = result + `
        ${this.getColumnClassName(this.props.columnClassName, breakpoint.name, i)} {
          width: ${i / columnsNumber * 100}%;
        }
      `;
    }

    // column pull
    for (let i = columnsNumber; i > 0; i--) {
      result = result + `
        ${this.getColumnClassName(this.props.columnPullClassName, breakpoint.name, i)} {
          right: ${i / columnsNumber * 100}%;
        }
      `;
    }
    result = result + `
      ${this.getColumnClassName(this.props.columnPullClassName, breakpoint.name)} {
        right: auto;
      }
    `;

    // column push
    for (let i = columnsNumber; i > 0; i--) {
      result = result + `
        ${this.getColumnClassName(this.props.columnPushClassName, breakpoint.name, i)} {
          left: ${i / columnsNumber * 100}%;
        }
      `;
    }
    result = result + `
      ${this.getColumnClassName(this.props.columnPushClassName, breakpoint.name)} {
        left: auto;
      }
    `;

    // column offset
    for (let i = columnsNumber; i > 0; i--) {
      result = result + `
        ${this.getColumnClassName(this.props.columnOffsetClassName, breakpoint.name, i)} {
          margin-left: ${i / columnsNumber * 100}%;
        }
      `;
    }
    result = result + `
      ${this.getColumnClassName(this.props.columnOffsetClassName, breakpoint.name)} {
        margin-left: 0%;
      }
    `;

    return result;

  }
  getColumnClassNamesForBreakpoint(breakpoint) {
    let result = '';
    for (let i = 1; i <= this.props.columnsNumber; i++) {
      result = result + `${this.getColumnClassName(this.props.columnClassName, breakpoint.name, i)},`;
    }
    return result.slice(0, -1);
  }
  getAllColumnStyles() {
    let result = '';
    this.props.breakpoints.forEach((breakpoint) => {
      result = result + `
        @media (min-width: ${breakpoint.minWidth}px) {
          ${this.getColumnClassNamesForBreakpoint(breakpoint)} {
            float: left;
          }
          ${this.getBreakpointColumnSizes(breakpoint, this.props.columnsNumber)}
        }
      `;
    });
    return result;
  }
  getContainerSizes() {
    let containerSizes = '';
    this.props.breakpoints.forEach((breakpoint) => {
      containerSizes = containerSizes + `
        @media (min-width: ${breakpoint.minWidth}px) {
          .${this.props.containerClassName} {
            width: ${breakpoint.containerWidth};
          }
        }
      `;
    });
    return containerSizes;
  }
  getIndent(value) {
    let indent;
    if (value === '2 spaces') {
      indent = '  ';
    } else if (value === '4 spaces') {
      indent = '    ';
    } else if (value === 'tab') {
      indent = '	';
    }
    return indent;
  }
  getBoxSizing() {
    let value = '';
    if (this.props.includeBoxSizing) {
      value = `
        * {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        *:before, *:after {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
      `;
    }
    return value;
  }
  getCSS() {
    let css = `
      ${this.getBoxSizing()}
      .${this.props.containerClassName} {
        margin-right: auto;
        margin-left: auto;
        padding-left: ${this.props.gutterWidth / 2}px;
        padding-right: ${this.props.gutterWidth / 2}px;
      }
      ${this.getContainerSizes()}
      .${this.props.containerClassName}-fluid {
        margin-right: auto;
        margin-left: auto;
        padding-left: ${this.props.gutterWidth / 2}px;
        padding-right: ${this.props.gutterWidth / 2}px;
      }
      .${this.props.rowClassName} {
        margin-left: -${this.props.gutterWidth / 2}px;
        margin-right: -${this.props.gutterWidth / 2}px;
      }
      ${this.getAllColumnClassNames()} {
        position: relative;
        min-height: 1px;
        padding-left: ${this.props.gutterWidth / 2}px;
        padding-right: ${this.props.gutterWidth / 2}px;
      }
      ${this.getAllColumnStyles()}
      .clearfix:before, .clearfix:after, .${this.props.containerClassName}:before, .${this.props.containerClassName}:after, .${this.props.containerClassName}-fluid:before, .${this.props.containerClassName}-fluid:after, .${this.props.rowClassName}:before, .${this.props.rowClassName}:after {
        content: " ";
        display: table;
      }
      .clearfix:after, .${this.props.containerClassName}:after, .${this.props.containerClassName}-fluid:after, .${this.props.rowClassName}:after {
        clear: both;
      }
    `;
    if (this.props.minify) {
      css = cssshrink.shrink(css);
    } else {
      css = cssbeautify(css, {
        indent: this.getIndent(this.props.indent),
      });
    }
    return css;
  }
  download() {
  	const data = this.textarea.value;
  	const blob = new Blob([data], { type: 'text/plain' });
  	const downloadLink = document.createElement('a');
  	downloadLink.download = 'grid.css';
  	downloadLink.innerHTML = 'Download';
  	if (window.webkitURL != null) {
  		downloadLink.href = window.webkitURL.createObjectURL(blob);
  	}	else {
  		downloadLink.href = window.URL.createObjectURL(blob);
  		downloadLink.onclick = destroyClickedElement;
  		downloadLink.style.display = 'none';
  		document.body.appendChild(downloadLink);
  	}
  	downloadLink.click();
  }
  selectCSS() {
    this.textarea.focus();
    this.textarea.select();
  }
  render() {
    return (
      <div>
        <div className="code">
          <div className="code__title">
            CSS code
          </div>
          <textarea className="code__value" value={this.getCSS()} ref={(c) => { this.textarea = c; }} readOnly></textarea>
        </div>
        <button
          className="primary-button primary-button_alternative"
          onClick={this.download.bind(this)}
          type="button"
          style={{ marginRight: '16px' }}
        >
          Download CSS
        </button>
        <button className="primary-button primary-button_secondary" onClick={this.selectCSS.bind(this)} type="button">
          Select all
        </button>
      </div>
    );
  }
}

CSSGrid.propTypes = {
  containerClassName: React.PropTypes.string,
  gutterWidth: React.PropTypes.number,
  breakpoints: React.PropTypes.array,
  columnsNumber: React.PropTypes.number
}

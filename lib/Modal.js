'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _a11yFocusScope = require('a11y-focus-scope');

var _a11yFocusScope2 = _interopRequireDefault(_a11yFocusScope);

var _a11yFocusStore = require('a11y-focus-store');

var _a11yFocusStore2 = _interopRequireDefault(_a11yFocusStore);

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setFocusOn(applicationElement, element) {
  _a11yFocusStore2.default.storeFocus();
  if (applicationElement) applicationElement.setAttribute('aria-hidden', 'true');
  _a11yFocusScope2.default.scopeFocus(element);
}

function resetFocus(applicationElement) {
  _a11yFocusScope2.default.unscopeFocus();
  if (applicationElement) applicationElement.removeAttribute('aria-hidden');
  _a11yFocusStore2.default.restoreFocus();
}

var ReactModal2 = function (_React$Component) {
  _inherits(ReactModal2, _React$Component);

  function ReactModal2() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactModal2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDocumentKeydown = function (event) {
      if (_this.props.closeOnEsc && event.keyCode === 27) {
        _this.props.onClose();
      }
    }, _this.handleBackdropClick = function () {
      if (_this.props.closeOnBackdropClick) {
        _this.props.onClose();
      }
    }, _this.handleModalClick = function (event) {
      event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactModal2.getApplicationElement = function getApplicationElement() {
    console.warn('`ReactModal2.getApplicationElement` needs to be set for accessibility reasons');
  };

  ReactModal2.prototype.componentDidMount = function componentDidMount() {
    if (_exenv2.default.canUseDOM) {
      setFocusOn(ReactModal2.getApplicationElement(), this.refs.modal);
      document.addEventListener('keydown', this.handleDocumentKeydown);
    }
  };

  ReactModal2.prototype.componentWillUnmount = function componentWillUnmount() {
    if (_exenv2.default.canUseDOM) {
      resetFocus(ReactModal2.getApplicationElement());
      document.removeEventListener('keydown', this.handleDocumentKeydown);
    }
  };

  ReactModal2.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { ref: 'backdrop',
        className: this.props.backdropClassName,
        style: this.props.backdropStyles,
        onClick: this.handleBackdropClick },
      _react2.default.createElement(
        'div',
        { ref: 'modal',
          className: this.props.modalClassName,
          style: this.props.modalStyles,
          onClick: this.handleModalClick,
          tabIndex: '-1' },
        this.props.children
      )
    );
  };

  return ReactModal2;
}(_react2.default.Component);

ReactModal2.propTypes = {
  onClose: _react2.default.PropTypes.func.isRequired,

  closeOnEsc: _react2.default.PropTypes.bool,
  closeOnBackdropClick: _react2.default.PropTypes.bool,

  backdropClassName: _react2.default.PropTypes.string,
  backdropStyles: _react2.default.PropTypes.object,

  modalClassName: _react2.default.PropTypes.string,
  modalStyles: _react2.default.PropTypes.object
};
ReactModal2.defaultProps = {
  closeOnEsc: true,
  closeOnBackdropClick: true
};
exports.default = ReactModal2;
"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ArCaptcha extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "state", {
      widget_id: "",
      id: ""
    });
    this.setRef = el => {
      this.containerRef = el;
    };

    // API Methods
    this.execute = this.execute.bind(this);
    this.resetCaptcha = this.resetCaptcha.bind(this);
  }
  componentDidMount() {
    //Once captcha is mounted intialize ArCaptcha
    this.setID();
    var my_script = document.head.querySelector("#arcptcha-script");
    let script = my_script || document.createElement("script");
    let domain = this.props.domain ? "?".concat(this.props.domain) : '';
    script.src = this.props.api_url ? this.props.api_url : "https://widget.arcaptcha.ir/1/api.js".concat(domain);
    script.id = "arcptcha-script";
    script.defer = true;
    if (!my_script) {
      window.arcaptchaWidgetLoading = new Promise((resolve, reject) => {
        script.onload = () => {
          resolve();
          this.initialize();
        };
      });
    }
    if (my_script || window.arcaptcha) {
      window.arcaptchaWidgetLoading.then(() => {
        this.initialize();
      });
    }
    if (!my_script) {
      document.head.appendChild(script);
    }
  }
  initialize() {
    this.loadCaptcha();
    window.addEventListener("arcaptcha-token-changed-".concat(this.state.widget_id), (event, v) => {
      /* this.props.onsetChallengeId(event.detail); */
    });
  }
  getRandomID() {
    return new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
  }
  execute() {
    return window.arcaptcha.execute(this.state.widget_id);
  }
  loadCaptcha() {
    const widgetId = window.arcaptcha.render("#".concat(this.state.id), {
      "site-key": this.props["site-key"],
      size: this.props.invisible ? "invisible" : "",
      callback: this.props.callback,
      rendered_callback: this.props.rendered_callback,
      closed_callback: this.props.closed_callback,
      opened_callback: this.props.opened_callback,
      error_callback: this.props.error_callback,
      reset_callback: this.props.reset_callback,
      expired_callback: this.props.expired_callback,
      chlexpired_callback: this.props.chlexpired_callback,
      lang: this.props.lang,
      theme: this.props.theme,
      color: this.props.color
    });
    this.setState({
      widget_id: widgetId
    });
  }
  resetCaptcha() {
    window.arcaptcha.reset(this.state.widget_id);
  }
  close() {
    window.arcaptcha.close(this.state.widget_id);
  }
  setID() {
    this.setState({
      id: "arcaptcha-widget-".concat(this.getRandomID())
    });
  }
  render() {
    const elementId = this.state.id;
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: this.setRef,
      id: elementId
    });
  }
}
var _default = exports.default = ArCaptcha;
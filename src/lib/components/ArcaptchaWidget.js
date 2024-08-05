import React, { Component } from "react";

class ArCaptcha extends Component {
  constructor(props) {
    super(props);
    this.setRef = () => {
      return "arcaptcha";
    };

    // API Methods
    this.execute = this.execute.bind(this);
    this.resetCaptcha = this.resetCaptcha.bind(this);
  }
  state = {
    widget_id: "",
    id: "",
  };

  componentWillUnmount() {
    let callbacks = [];
    for (var prop in window)
      if (
        prop.includes("arcaptcha_callback_") ||
        prop.includes("arcaptcha_rendered_callback_") ||
        prop.includes("arcaptcha_closed_callback_") ||
        prop.includes("arcaptcha_opened_callback_") ||
        prop.includes("arcaptcha_error_callback_") ||
        prop.includes("arcaptcha_reset_callback_") ||
        prop.includes("arcaptcha_expired_callback_") ||
        prop.includes("arcaptcha_chlexpired_callback_")
      )
        callbacks.push(prop);
    callbacks.forEach((arr) => {
      delete window[arr];
    });
  }
  componentDidMount() {
    //Once captcha is mounted intialize ArCaptcha
    this.setID();
    var my_script = document.head.querySelector("#arcptcha-script");
    let script = my_script || document.createElement("script");
    let domain = this.props.domain ? `?${this.props.domain}` : '';
    script.src = this.props.api_url
      ? this.props.api_url
      : `https://widget.arcaptcha.ir/1/api.js${domain}`;
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
    if (my_script) {
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
    window.addEventListener(
      `arcaptcha-token-changed-${this.state.widget_id}`,
      (event, v) => {
        /* this.props.onsetChallengeId(event.detail); */
      }
    );
  }
  getRandomID() {
    return (
      new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
    );
  }

  execute() {
    return window.arcaptcha.execute(this.state.widget_id);
  }
  registerCallback() {
    if (this.props.callback)
      window[`arcaptcha_callback_${this.state.id}`] = this.props.callback;

    if (this.props.rendered_callback)
      window[`arcaptcha_rendered_callback_${this.state.id}`] =
        this.props.rendered_callback;

    if (this.props.closed_callback)
      window[`arcaptcha_closed_callback_${this.state.id}`] =
        this.props.closed_callback;

    if (this.props.opened_callback)
      window[`arcaptcha_opened_callback_${this.state.id}`] =
        this.props.opened_callback;

    if (this.props.error_callback)
      window[`arcaptcha_error_callback_${this.state.id}`] =
        this.props.error_callback;

    if (this.props.reset_callback)
      window[`arcaptcha_reset_callback_${this.state.id}`] =
        this.props.reset_callback;

    if (this.props.expired_callback)
      window[`arcaptcha_expired_callback_${this.state.id}`] =
        this.props.expired_callback;

    if (this.props.chlexpired_callback)
      window[`arcaptcha_chlexpired_callback_${this.state.id}`] =
        this.props.chlexpired_callback;
  }
  loadCaptcha() {
    this.registerCallback();
    const widgetId = window.arcaptcha.render(`#${this.state.id}`, {
      "site-key": this.props["site-key"],
      size: this.props.invisible ? "invisible" : "",
      callback: this.props.callback
        ? `arcaptcha_callback_${this.state.id}`
        : false,
      rendered_callback: this.props.rendered_callback
        ? `arcaptcha_rendered_callback_${this.state.id}`
        : false,
      closed_callback: this.props.closed_callback
        ? `arcaptcha_closed_callback_${this.state.id}`
        : false,
      opened_callback: this.props.opened_callback
        ? `arcaptcha_opened_callback_${this.state.id}`
        : false,
      error_callback: this.props.error_callback
        ? `arcaptcha_error_callback_${this.state.id}`
        : false,
      reset_callback: this.props.reset_callback
        ? `arcaptcha_reset_callback_${this.state.id}`
        : false,
      expired_callback: this.props.expired_callback
        ? `arcaptcha_expired_callback_${this.state.id}`
        : false,
      chlexpired_callback: this.props.chlexpired_callback
        ? `arcaptcha_chlexpired_callback_${this.state.id}`
        : false,
      lang: this.props.lang,
      theme: this.props.theme,
      color: this.props.color,
    });
    this.setState({ widget_id: widgetId });
  }

  resetCaptcha() {
    window.arcaptcha.reset(this.state.widget_id);
  }

  close() {
    window.arcaptcha.close(this.state.widget_id);
  }

  setID() {
    this.setState({ id: `arcaptcha-widget-${this.getRandomID()}` });
  }

  render() {
    const elementId = this.state.id;
    return <div ref={this.setRef} id={elementId}></div>;
  }
}
export default ArCaptcha;

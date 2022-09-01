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

  componentDidMount() {
    //Once captcha is mounted intialize ArCaptcha
    this.setID();
    var my_script = document.head.querySelector("#arcptcha-script");
    let script = my_script || document.createElement("script");
    if (!my_script) {
      window.arcaptchaWidgetLoading = new Promise((resolve, reject) => {
        script.src = `https://widget.arcaptcha.ir/1/api.js`;
        script.id = "arcptcha-script";
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
    window.arcaptcha.execute(this.state.widget_id);
  }
  registerCallback() {
    if (this.props.callback) {
      window[`arcaptcha_callback_${this.state.id}`] = this.props.callback;
      console.log(this.props.callback);
    }
    if (this.props.rendered_callback)
      window[`arcaptcha_rendered_callback_${this.state.id}`] =
        this.props.rendered_callback;
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
        : null,
      rendered_callback: this.props.rendered_callback
        ? `arcaptcha_rendered_callback_${this.state.id}`
        : null,
      error_callback: this.props.error_callback
        ? `arcaptcha_error_callback_${this.state.id}`
        : null,
      reset_callback: this.props.reset_callback
        ? `arcaptcha_reset_callback_${this.state.id}`
        : null,
      expired_callback: this.props.expired_callback
        ? `arcaptcha_expired_callback_${this.state.id}`
        : null,
      chlexpired_callback: this.props.chlexpired_callback
        ? `arcaptcha_chlexpired_callback_${this.state.id}`
        : null,
      lang: this.props.lang,
      theme: this.props.theme,
      color: this.props.color,
    });
    this.setState({ widget_id: widgetId });
  }

  resetCaptcha() {
    window.arcaptcha.reset(this.state.widget_id);
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

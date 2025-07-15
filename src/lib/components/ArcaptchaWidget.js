import React, { Component } from "react";

class ArCaptcha extends Component {
  constructor(props) {
    super(props);
    this.setRef = (el) => {
      this.containerRef = el
    }
    
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
  loadCaptcha() {
    const widgetId = window.arcaptcha.render(`#${this.state.id}`, {
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

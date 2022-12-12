import React, { Component } from "react";
import { ArcaptchaWidget } from "./lib/index";

class App extends Component {
  constructor() {
    super();
    this.ArRef = React.createRef();
  }
  getToken(token) {
  }
  checkCallback(e) {
  }
  render() {
    return (
      <div>
        <ArcaptchaWidget
          ref={this.ArRef}
          site-key="4pmvo77wq2"
          callback={this.getToken}
          api_url="https://widget.arcaptcha.ir/1/api.js"
          // reset_callback={this.checkCallback}
          rendered_callback = {this.checkCallback}
          expired_callback = {this.checkCallback}
          theme="dark" //it's not required. Default is light
          lang="fa" //it's not required. Default is fa
          color="pink"
        />
      </div>
    );
  }
}

export default App;

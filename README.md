# React Arcaptcha Component Library

## Description

Arcaptcha Component Library for ReactJS.

[Arcaptcha](https://arcaptcha.ir/) is a drop-replacement for reCAPTCHA and hCaptcha that protects user privacy, rewards websites, and helps companies get their data labeled.

Sign up at [Arcaptcha](https://arcaptcha.ir/sign-up) to get your sitekey today. You need a **sitekey** to use this library.

## Installation

You can install this library via npm with:

```
  npm i arcaptcha-react
```

## Usage

The requirement for usage are the site-key prop. The component will automatically include and load the Arcaptcha API library and append it to the body.

- Basic:

```javascript
import React from "react";
import { ArcaptchaWidget } from "arcaptcha-react";

class YOUR_COMPONENT_NAME extends Component {
  constructor() {
    super();
    this.ArRef = React.createRef();
  }
  getToken = (token) => {
    //do something with your token.
  };
  render() {
    return (
      <div>
        <ArcaptchaWidget
          ref={this.ArRef}
          site-key="YOUR_SITE_KEY"
          callback={this.getToken}
          theme="dark" //it's not required. Default is light
          lang="en" //it's not required. Default is fa
        />
      </div>
    );
  }
}
```

- Invisible:

```javascript
import React from "react";
import { ArcaptchaWidget } from "arcaptcha-react";

class ArcaptchaReact extends React.Component {
  constructor() {
    super();
    this.ArRef = React.createRef();
  }
  onSuccess = (token) => {
    //do something with your token.
  };
  execute = () => {
    this.ArRef.current.execute();
  };
  reset = () => {
    this.ArRef.current.resetCaptcha();
  };
  render() {
    return (
      <div>
        <ArcaptchaWidget
          ref={this.ArRef}
          site-key="YOUR_SITE_KEY"
          callback={this.onSuccess}
          invisible={true}
        />
        <button type="button" onClick={this.execute}>
          execute
        </button>
        <button type="button" onClick={this.reset}>
          reset
        </button>
      </div>
    );
  }
}
export default ArcaptchaReact;
```

- Invisible with promise:

```javascript
import React from "react";
import { ArcaptchaWidget } from "arcaptcha-react";

class ArcaptchaReact extends React.Component {
  constructor() {
    super();
    this.ArRef = React.createRef();
  }
  execute = () => {
    this.ArRef.current.execute().then((token) => {
      console.log(token);
    });
  };
  reset = () => {
    this.ArRef.current.resetCaptcha();
  };
  render() {
    return (
      <div>
        <ArcaptchaWidget
          ref={this.ArRef}
          site-key="YOUR_SITE_KEY"
          invisible={true}
        />
        <button type="button" onClick={this.execute}>
          execute
        </button>
        <button type="button" onClick={this.reset}>
          reset
        </button>
      </div>
    );
  }
}
export default ArcaptchaReact;
```

- Basic in TypeScript:
```Typescript
import React, { Component, createRef } from "react";
import { ArcaptchaWidget, ArcaptchaWidgetHandle } from "arcaptcha-react";

class ArcaptchaReact extends Component {
  ArRef = createRef<ArcaptchaWidgetHandle>();

  getToken = (token?: string) => {
    console.log("Captcha token from callback:", token);
  };

  render() {
    return (
      <div>
        <h2>Arcaptcha Basic Widget (Class Component)</h2>
        <ArcaptchaWidget
          ref={this.ArRef}
          site-key="YOUR_SITE_KEY"
          callback={this.getToken}
          theme="dark" 
          lang="en" 
        />
      </div>
    );
  }
}

export default ArcaptchaReact;
```

- Invisible in TypeScript:
```Typescript
import React, { useRef } from 'react';
import { ArcaptchaWidget, ArcaptchaWidgetHandle } from 'arcaptcha-react';

const ArcaptchaReact: React.FC = () => {
  const arcaptchaRef = useRef<ArcaptchaWidgetHandle>(null);

  const handleSuccess = (token?: string) => {
    console.log('Callback Captcha success:', token);
  };

  const triggerCaptcha = () => {
    arcaptchaRef.current?.execute();
  };

  return (
    <div>
      <ArcaptchaWidget
        ref={arcaptchaRef}
        site-key="YOUR_SITE_KEY"
        callback={handleSuccess}
        invisible={true}
      />
      <button onClick={triggerCaptcha}>Trigger Captcha</button>
    </div>
  );
};

export default ArcaptchaReact;

```

- Invisible with promise in TypeScript:
```TypeScript
import React, { useRef } from 'react';
import { ArcaptchaWidget, ArcaptchaWidgetHandle } from 'arcaptcha-react';

const ArcaptchaReact: React.FC = () => {
  const arcaptchaRef = useRef<ArcaptchaWidgetHandle>(null);

  const execute = async () => {
    console.log('Execute button clicked');
    try {
      const token= await arcaptchaRef.current?.execute();
      console.log('Arcaptcha_token:', token?.arcaptcha_token);
      console.log('Site_key:', token?.site_key);
    } catch (err) {
      console.error('Error executing captcha:', err);
    }
  };

  const reset = () => {
    console.log('Reset button clicked');
    arcaptchaRef.current?.resetCaptcha();
  };

  return (
    <div>
      <ArcaptchaWidget
        ref={arcaptchaRef}
        site-key="SITE_KEY"
        invisible={true}
        theme='dark'
      />
      <button onClick={execute}>Execute</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default ArcaptchaReact;
```

## Props

| Name                | Values/Type | Required | Default                              | Description                                                                                                                                                           |
| ------------------- | ----------- | -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| site-key            | string      | Yes      | -                                    | This is your sitekey, this allows you to load captcha. If you need a sitekey, please visit [Arcaptcha](https://arcaptcha.ir/sign-up), and sign up to get your sitekey |
| domain              | string      | NO       | `window.location.hostname`           | Whenever there is no access to `window` (Mobile enviroments) you can set domain manually                                                                              |
| invisible           | Boolean     | NO       | False                                | This allows you to use invisible captcha for you forms                                                                                                                |
| lang                | string      | NO       | fa                                   | This allows you to choose language by this prop. you can choose 'en' or 'fa' for english and persion language                                                         |
| theme               | string      | NO       | light                                | This allows you to choose theme for your widget. The themes are light and dark                                                                                        |
| color               | String      | No       | normal                               | Color of every colored element in widget and challenge.                                                                                                               |
| api_url             | String      | No       | https://widget.arcaptcha.ir/1/api.js | This allows you to change default widget api.                                                                                                                         |
| callback            | Function    | NO       | null                                 | This function would be called after solving captcha                                                                                                                   |
| rendered_callback   | Function    | NO       | null                                 | This function would be called after rendering checkbox                                                                                                                |
| closed_callback     | Function    | NO       | null                                 | This function would be called after closing captcha challenge                                                                                                         |
| opened_callback     | Function    | NO       | null                                 | This function would be called after opening captcha challenge                                                                                                         |
| error_callback      | Function    | NO       | null                                 | This function would be called after error                                                                                                                             |
| reset_callback      | Function    | NO       | null                                 | This function would be called after reseting captcha                                                                                                                  |
| expired_callback    | Function    | NO       | null                                 | This function would be called after expiring                                                                                                                          |
| chlexpired_callback | Function    | NO       | null                                 | This function would be called after challange expiration                                                                                                              |

## Methods

| Method         | Description                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| execute()      | Programmatically trigger a challenge request. You can use this, to load invisible captcha after trigger a button |
| close()        | Programmatically trigger a close challenge request. You can use this to close challenge container                |
| resetCaptcha() | Reset the current challenge                                                                                      |

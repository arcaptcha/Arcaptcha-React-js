import * as React from 'react'

export interface ArcaptchaWidgetProps {
  "site-key": string
  size?: 'normal' | 'invisible'
  domain?: string
  invisible?: boolean
  theme?: 'light' | 'dark'
  color?: string
  error_print?: 0 | 1
  api_url?: string
  lang?: 'en' | 'fa'
  callback?: (token?: string) => void
  rendered_callback?: () => void
  error_callback?: () => void
  reset_callback?: () => void
  expired_callback?: () => void
  chlexpired_callback?: () => void
  blocked_callback?: () => void
  clicked_callback?: () => void
  opened_callback?: () => void
  closed_callback?: () => void
}

export interface ArcaptchaExecuteResponse {
  arcaptcha_token: string;
  site_key: string;
}

export interface ArcaptchaWidgetHandle {
  execute: () => Promise<ArcaptchaExecuteResponse>;
  resetCaptcha: () => void;
  close?: () => void;
}

export declare const ArcaptchaWidget: React.ForwardRefExoticComponent<
  ArcaptchaWidgetProps & React.RefAttributes<ArcaptchaWidgetHandle>
>;

export default ArcaptchaWidget

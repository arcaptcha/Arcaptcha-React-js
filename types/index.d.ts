// types/index.d.ts ✅
import * as React from 'react'

export interface ArcaptchaWidgetProps {
  "site-key": string
  size?: 'normal' | 'invisible'
  theme?: 'light' | 'dark'
  color?: string
  error_print?: 0 | 1
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

export const ArcaptchaWidget: React.ComponentType<ArcaptchaWidgetProps>
export default ArcaptchaWidget

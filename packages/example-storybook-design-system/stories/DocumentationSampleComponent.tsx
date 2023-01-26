import React, {PropsWithChildren} from 'react'

export type DocumentationSampleComponentProps = PropsWithChildren<{
  /** Specifies font size. */
  variant?: 'small' | 'large'
}>

/**
 * This is a documentation sample component. It demonstrates how documentation
 * is generated in Storybook's story. The component represents a HTML5 paragraph.
 */
export const DocumentationSampleComponent = ({children, variant = 'small'}: DocumentationSampleComponentProps) => (
  <p style={{fontSize: variant === 'small' ? '1rem' : '1.5rem', fontFamily: 'Arial'}}>
    {children}
  </p>
)
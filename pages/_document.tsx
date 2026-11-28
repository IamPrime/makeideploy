import React from 'react'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import HeadElements from '../component/head'

export default function Document(props: DocumentProps) {
  // The page resolved the language on the server (see helpers/locale), so
  // <html lang> is right before any script runs.
  const lang = props.__NEXT_DATA__.props?.pageProps?.locale || 'pcm'
  return (
    <Html lang={lang}>
      <Head>
        <HeadElements />
      </Head>
      <body>
        {/* Apply the theme before first paint so it doesn't flash while React
            loads: the visitor's saved choice, else their system setting.
            Keep in step with the same rule in component/footer.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.body.classList.add('dark')}catch(e){}"
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import React from 'react'

const Head = () => {
  return (
    <>
      <meta charSet="utf-8" />
      {/* The page title (and its og/twitter/itemprop copies) is set per
          language in pages/index.tsx. */}
      <meta
        name="description"
        content="E Good Make I Deploy Today? | Reminder for all dem Developers, Designers and Ogas at the top"
      />

      <meta
        itemProp="description"
        content="E Good Make I Deploy Today? | Reminder for all dem Developers, Designers and Ogas at the top"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:description"
        content="E Good Make I Deploy Today? | Reminder for all dem Developers, Designers and Ogas at the top"
      />

      <meta
        property="og:description"
        content="E Good Make I Deploy Today? | Reminder for all dem Developers, Designers and Ogas at the top"
      />
      <meta property="og:url" content="https://makeideploy.today" />
      <meta property="og:site_name" content="E Good Make I Deploy Today?" />
      <meta property="og:type" content="website" />
    </>
  )
}

export default Head
'use client'

import { usePathname } from 'next/navigation'
import Head from 'next/head'

export default function CanonicalLink() {
  const pathname = usePathname()
  const canonicalUrl = `http://localhost:3000${pathname === '/' ? '' : pathname}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
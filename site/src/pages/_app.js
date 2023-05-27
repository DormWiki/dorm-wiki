import { SessionProvider } from 'next-auth/react'

import '@/styles/globals.css'
import '@/styles/Carousel.module.css'

export default function App({ Component, pageProps }) {
  // manage user session
  return (
    <SessionProvider session={pageProps.session}>
     <Component {...pageProps} />
    </SessionProvider>
   );
}

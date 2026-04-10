import { useCallback } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useModal }        from './hooks/useModal'

import Cursor  from './components/Cursor'
import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import Gallery from './components/Gallery'
import About   from './components/About'
import Services from './components/Services'
import Packs   from './components/Packs'
import Contact from './components/Contact'
import Modal   from './components/Modal'
import Footer  from './components/Footer'

export default function App() {
  const { isOpen, preselect, open, close } = useModal()

  // Re-observe newly rendered elements after every render
  useScrollReveal()

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <Cursor />

      <Navbar onContact={() => open()} />

      <Hero
        onGallery={() => scrollTo('galeria')}
        onPacks={() => scrollTo('packs')}
      />

      <Gallery />

      <About />

      <Services />

      <Packs onReserve={open} />

      <Contact onOpen={() => open()} />

      <Footer />

      <Modal isOpen={isOpen} onClose={close} preselect={preselect} />
    </>
  )
}

import { useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Services from '../components/Services'
import Packs from '../components/Packs'
import Contact from '../components/Contact'

export default function Home() {
    const { open } = useOutletContext();
    useScrollReveal()

    const scrollTo = useCallback((id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (<>

        <Hero
            onGallery={() => scrollTo('galeria')}
            onPacks={() => scrollTo('packs')}
        />

        <Gallery />

        <About />

        <Services />
        
        <Packs onReserve={open}/>
        <Contact onOpen={() => open()} />

    </>)
}
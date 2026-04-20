import { Outlet } from 'react-router-dom'
import { useModal } from '../hooks/useModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

export default function MainLayout(){
    const {isOpen,preselect, open,close} = useModal();

    return (<>
        <Navbar onContact={()=>open()}/>
        <main>
            <Outlet context={{open}}/>
        </main>
        <Footer/>
        <Modal isOpen={isOpen} onClose={close} preselect={preselect}/>
    </>)
}
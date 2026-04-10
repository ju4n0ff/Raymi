import "./assets/raymi.css"
import "./app.css"
import Cursor from "./Components/Cursor/Cursor.jsx"
import Navbar from "./Components/Navbar/Navbar.jsx"
import ContactSection from "./Components/ContactSection/ContactSection.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import Hero from "./Components/Hero/Hero.jsx"
function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero/>
      <Footer/>
    </>
  );
}

export default App;
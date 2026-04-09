import "./assets/raymi.css"
import "./app.css"
import Cursor from "./Components/Cursor/Cursor.jsx"
import Navbar from "./Components/Navbar/Navbar.jsx"
import ContactSection from "./Components/ContactSection/ContactSection.jsx"

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <ContactSection />
    </>
  );
}

export default App;
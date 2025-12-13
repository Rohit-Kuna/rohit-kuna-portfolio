import Navbar from "#components/NavBar";
import Welcome from "#components/Welcome";
import Dock from "#components/Dock";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { Terminal, Safari, Resume, Finder, Text, Image } from "#windows";

gsap.registerPlugin(Draggable);

const App=()=>{
  return ( 
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
    </main>
  );
};

export default App;
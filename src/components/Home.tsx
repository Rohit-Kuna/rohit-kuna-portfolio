import { locations } from "#content/location.content";
import useLocationStore from "#store/location";
import { useWindowStore } from "#store/window";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const projects = (locations.work?.children ?? []).filter(
  (node) => node.kind === "folder"
);

const Home = () => {
    const { setActiveLocation} = useLocationStore();

    const { openWindow } = useWindowStore();
    const handleOpenProjectFinder = (project:any) =>{
        setActiveLocation(project);
        openWindow("finder");
    };

  useGSAP(() => {
    Draggable.create('.folder');
  }, []);

  return (

    <section id="home">
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="folder group" onClick={()=>handleOpenProjectFinder(project)}>
            <img
              src="/images/folder.png"
              alt={project.name}
            />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>

  );
};

export default Home;

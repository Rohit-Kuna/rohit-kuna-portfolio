import { locations } from "#content/location.content";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const projects = (locations.work?.children ?? []).filter(
  (node) => node.kind === "folder"
);

const Home = () => {
  useGSAP(() => {
    Draggable.create('.folder');
  }, []);

  return (

    <section id="home">
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="folder group">
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

import WindowControls from "#components/WindowControls";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants/content";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";
import type {
  Location,
  FolderNode,
  FileNode,
  FinderNode,
  WindowKey
} from "#types/contentTypes";

/* ------------------------------------------------------------------ */
/* Finder Component */
/* ------------------------------------------------------------------ */

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  /* ---------- Open file / folder ---------- */
  const openItem = (item: FinderNode) => {
    // Folder → navigate
    if (item.kind === "folder") {
      setActiveLocation(item);
      return;
    }

    // File handling
    const file = item as FileNode;

    if (file.fileType === "pdf") {
      openWindow("resume");
      return;
    }

    if (
      (file.fileType === "fig" || file.fileType === "url") &&
      file.href
    ) {
      window.open(file.href, "_blank");
      return;
    }

    // txtfile / imgfile
    const windowKey = `${file.fileType}${file.kind}` as WindowKey;
    openWindow(windowKey, file);
  };

  /* ---------- Sidebar renderer ---------- */
  const renderList = (
    title: string,
    items: Array<Location | FolderNode>
  ) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation?.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  /* ---------- Render ---------- */
  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        {/* Sidebar */}
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList(
            "Projects",
            locations.work.children.filter(
              (item): item is FolderNode => item.kind === "folder"
            )
          )}
        </div>

        {/* Content */}
        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Wrapped Window */
/* ------------------------------------------------------------------ */

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;

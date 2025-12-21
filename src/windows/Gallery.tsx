import WindowControls from "#components/WindowControls";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import clsx from "clsx";
import { useState } from "react";
import { useWindowStore } from "#store/window";
import { PhotosLink } from "#types/other.types";
import { gallery, photosLinks } from "#content/other.content";
import type { WindowKey } from "#types/windows.types";

/* ------------------------------------------------------------------ */
/* Gallery (Photos App) */
/* ------------------------------------------------------------------ */

const Gallery = () => {
  const { openWindow } = useWindowStore();

  const [activeLink, setActiveLink] = useState<PhotosLink | null>(
    photosLinks[0] ?? null
  );

  const openPhoto = (item: (typeof gallery)[number]) => {
    openWindow("photoPreview" as WindowKey, item);
  };

  return (
    <div id="photos">
      {/* Window Header */}
      <div id="window-header">
        <WindowControls target="photos" />
        <Search className="icon" />
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            {photosLinks.map((link) => (
              <li
                key={link.id}
                onClick={() => setActiveLink(link)}
                className={clsx(
                  activeLink?.id === link.id &&
                    "bg-blue-100 text-blue-700"
                )}
              >
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </aside>

        {/* Gallery */}
        <section className="gallery">
          <ul>
            {gallery.map((item) => (
              <li
                key={item.id}
                onClick={() => openPhoto(item)}
                className="cursor-pointer"
              >
                <img src={item.img} alt="" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;

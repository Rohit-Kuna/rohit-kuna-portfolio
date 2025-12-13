import WindowControls from "#components/WindowControls";
import useWindowStore from "#store/window";
import WindowWrapper from "#hoc/WindowWrapper";
import type { FileNode } from "#types/contentTypes";

/* ---------- Component ---------- */

const Image = () => {
  const { windows } = useWindowStore();

  const windowState = windows.imgfile;
  const data = windowState?.data as FileNode | null;

  if (!data || data.fileType !== "img") return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {imageUrl && (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        )}
      </div>
    </>
  );
};

/* ---------- Wrapped Window ---------- */

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;

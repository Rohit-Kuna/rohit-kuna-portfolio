import useWindowStore from "#store/window";
import type { WindowKey } from "#types/contentTypes";

/* ---------- Props ---------- */

type WindowControlsProps = {
  target: WindowKey;
};

/* ---------- Component ---------- */

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div
        className="close"
        onClick={() => closeWindow(target)}
        role="button"
        aria-label="Close window"
      />

      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;

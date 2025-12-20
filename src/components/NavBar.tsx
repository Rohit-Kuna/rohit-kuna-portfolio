import dayjs from "dayjs";
import { navIcons, navLinks } from "#content/other.content";
import { useWindowStore } from "#store/window";
import type { WindowKey } from "#types/windows.types";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { openWindow, closeWindow } = useWindowStore();
  const getState = useWindowStore.getState;

  const toggleWindow = (key: WindowKey) => {
    const window = getState().windows[key];
    if (!window) return;

    window.isOpen
      ? closeWindow(key)
      : openWindow(key);
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-semibold">Rohit's Portfolio</p>

        <ul className="flex items-center gap-2">
          {navLinks.map(({ id, name, type, icon: Icon }) => (
            <li
              key={id}
              onClick={() => toggleWindow(type as WindowKey)}
              data-tooltip-id="nav-tooltip"
              data-tooltip-content={name}
              aria-label={name}
              className="relative flex items-center justify-center w-8 h-8 cursor-pointer"
              data-tooltip-delay-show={150}
            >
              <Icon size={14} strokeWidth={2.7} />
            </li>
          ))}
        </ul>

        <Tooltip id="nav-tooltip" place="bottom" className="tooltip" />
      </div>

      <div>
        <ul className="flex items-center gap-2">
          {navIcons.map(({ id, icon: Icon }) => (
            <li
              key={id}
              className="relative flex items-center justify-center w-8 h-8"
            >
              <Icon size={14} strokeWidth={2.7} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;

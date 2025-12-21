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
        <img src="/images/iconapplewhite.png" className="w-8 h-8 p-2 left-0.5" alt="logo" />
        <p className="font-semibold text-white">Rohit's Portfolio</p>

        <ul className="flex items-center gap-2">
          {navLinks.map(({ id, name, type}) => (
            <li
              key={id}
              onClick={() => toggleWindow(type as WindowKey)}
              aria-label={name}
              className="relative flex items-center justify-center cursor-pointer"
            >
              <p>{name}</p>
            </li>
          ))}
        </ul>
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

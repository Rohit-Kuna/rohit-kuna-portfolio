import WindowControls from "#components/WindowControls";
import { blogPosts } from "#content/other.content";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  Search,
  ShieldHalf,
  Share,
  Plus,
  Copy,
  MoveRight
} from "lucide-react";

/* ---------- Component ---------- */

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="safari-content window-scroll mac-scrollbar">
        <div className="articles-page">
          <h2>My Articles</h2>
          <hr />

          <div className="articles-list">
            {blogPosts.map(({ id, icon: Icon, title, date, link }) => (
              <div key={id} className="article-row">
                <Icon className="article-icon" />

                <div className="article-text">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{title}</h3>
                    <span>{date}</span>
                  </a>
                </div>

                <MoveRight className="article-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------- Wrapped Window ---------- */
const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;

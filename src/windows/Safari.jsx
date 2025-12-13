import WindowControls from "#components/WindowControls";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { ChevronLeft, ChevronRight, PanelLeft, Search, ShieldHalf, Share, Plus, Copy, MoveRight } from "lucide-react";

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

            <div className="pr1">
                <div className="blog p-6 window-scroll mac-scrollbar">
                    <h2 className="text-pink-600 text-2xl font-bold mb-6">
                        My Developer Blog
                    </h2>

                    <div className="space-y-8">
                        {blogPosts.map(({ id, image, title, date, link }) => (
                            <div key={id} className="blog-post flex items-center gap-4">
                                <div className="col-span-2">
                                    <img src={image} alt={title} className="w-12 h-12 object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="text-gray-500 text-sm">{date}</p>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        Check out the full post <MoveRight className="icon-hover" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
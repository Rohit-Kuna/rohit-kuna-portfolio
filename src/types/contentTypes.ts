/* ---------- Common ---------- */

export type ID = number | string;

export type Position = string; // Tailwind positions (CMS string)

/* ---------- Navigation ---------- */

export type NavLink = {
  id: number;
  name: string;
  type: string; // future CMS enum
};

export type NavIcon = {
  id: number;
  img: string;
};

/* ---------- Dock ---------- */

export type DockApp = {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
};

/* ---------- Blog ---------- */

export type BlogPost = {
  id: number;
  date: string; // CMS date string
  title: string;
  image: string;
  link: string;
};

/* ---------- Tech Stack ---------- */

export type TechStackCategory = {
  category: string;
  items: string[];
};

/* ---------- Social ---------- */

export type SocialLink = {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
};

/* ---------- Gallery ---------- */

export type GalleryItem = {
  id: number;
  img: string;
};

export type PhotosLink = {
  id: number;
  icon: string;
  title: string;
};

/* ---------- Finder / File System ---------- */

export type FileKind = "file" | "folder";

export type FileType = "txt" | "img" | "url" | "fig" | "pdf";

export type BaseNode = {
  id: ID;
  name: string;
  icon: string;
  kind: FileKind;
  position?: Position;
};

export type FileNode = BaseNode & {
  kind: "file";
  fileType: FileType;
  href?: string;
  imageUrl?: string;
  subtitle?: string;
  image?: string;
  description?: string[];
};

export type FolderNode = BaseNode & {
  kind: "folder";
  windowPosition?: Position;
  children: FinderNode[];
};

export type FinderNode = FileNode | FolderNode;

/* ---------- Locations ---------- */

export type Location = {
  id: number;
  type: string;
  name: string;
  icon: string;
  kind: "folder";
  children: FinderNode[];
};

export type NavigableFolder = Location | FolderNode;

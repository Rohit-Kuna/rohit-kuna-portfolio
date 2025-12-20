import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";

import { pdfjs, Document, Page } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
/* ---------- Component ---------- */

const Resume = () => {
  return (
    <>
    
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <div className="pr-1">
  <div className="window-scroll mac-scrollbar">
    <div className="flex justify-center">
      <Document file="/files/resume.pdf">
        <Page
          pageNumber={1}
          renderTextLayer
          renderAnnotationLayer
        />
        <Page
          pageNumber={2}
          renderTextLayer
          renderAnnotationLayer
        />
      </Document>
    </div>
  </div>
</div>

    </>
  );
};

/* ---------- Wrapped Window ---------- */

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;

import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";

const Resume = () =>{
    console.log("Resume component mounted!");
    return(
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>
                <a href="files/resume.pdf"
                    download
                    className='cursor-pointer'
                    title="Download resume"
                >
                    <Download className="icon" />
                </a>
            </div>
        </>
    )
}
const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
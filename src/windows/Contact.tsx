import WindowControls from "#components/WindowControls";
import { socials } from "#content/other.content";
import WindowWrapper from "#hoc/WindowWrapper";
import {Mail} from "lucide-react";
const Contact=()=>{
    return(
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>
            <div className="p-5 space-y-5">
                <img src="/images/adrian.jpg" alt="Rohit" className="w-20 rounded-full" />
                <h3>Let's Connect</h3>
                <p>Got an idea ? A bug to squash? Or just wanna talk tech? I'm in.</p>
                <p ><a className="p-1 hover:bg-gray-200 rounded cursor-pointer" href="mailto:rohitkuna28@gmail.com"><Mail className="icon inline"/>rohitkuna28@gmail.com</a></p>
                <ul>
                    {socials.map(({id,bg,link,icon, text})=>(
                        <li key={id} style={{backgroundColor:bg}}>
                            <a href={link} target="_blank" rel="nopener noreferre" title={text}>
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>

                        </li>

                    ))}
                </ul>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
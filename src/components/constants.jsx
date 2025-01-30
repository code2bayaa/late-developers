"use clients"
import { faCartShopping, faLaptop, faMapPin, faMobileAndroid, faPenToSquare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {client1, client5, client6, client7, client8,
    accredition1, accredition2, accredition3, accredition4, accredition5,
    website1,website2,website3,website4,website5, mobile1, mobile2, mobile3, mobile4, mobile5
    
} from "./../assets/index.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const clients = [

    {
        image:client5,
        link:"https://collabowid.org",
        name : "CWID"
    },
    {
        image:client1,
        link:"https://weforshe.netlify.app/",
        name:"WE FOR SHE"
    },
    {
        image:client8,
        // link:"https://www.akilidada.org",
        name:"FLOG"
    },
    {
        image:client6,
        link:"",
        name:"BETTER BUTTER"
    },
    {
        image:client7,
        link:"",
        name:"CTM"
    },
]

const accreditors = [
    {
        image:accredition1,
        link:"",
        name : "CWID"
    },
    {
        image:accredition2,
        link:"",
        name:"AFRICA YOUTH TRUST"
    },
    {
        image:accredition3,
        link:"",
        name:"FLOG"
    },
    {
        image:accredition4,
        link:"",
        name:"BETTER BUTTER"
    },
    {
        image:accredition5,
        link:"",
        name:"BETTER BUTTER"
    },
]

// console.log(clients)
const websites = [
    {
        image:website1,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>S</span>EO-Optimized for Visibility</h3>
            <span>We build websites with search engine optimization (SEO) in mind, helping your business rank higher in search results.With optimized structure, keywords, and fast loading speeds, your website will attract more traffic and conversions.</span>
        </div>
    },
    {
        image:website2,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>D</span>ynamic and Interactive Content</h3>
            <span><i>late developers</i> specializes in creating websites with engaging, dynamic content to keep your audience captivated.From animations to real-time data integrations, our websites are designed to enhance user experience and foster visitor retention.</span>
        </div>
    },
    {
        image:website3,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>R</span>esponsive Design Across All Devices</h3>
            <span>Our websites are fully responsive, ensuring they look and function perfectly on desktops, tablets, and smartphones.This seamless adaptability improves user satisfaction and ensures your business reaches a broader audience.</span>
        </div>
    },
    {
        image:website4,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>C</span>ontinuous Updates and Support</h3>
            <span>We provide ongoing updates and technical support to ensure your website remains secure, up-to-date, and optimized for performance.Regular maintenance includes bug fixes, feature enhancements, and compatibility adjustments to align with evolving technologies.</span>
        </div>
    },
    {
        image:website5,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>D</span>eployed on Robust and Secure Servers</h3>
            <span>Your website will be hosted on reliable and scalable servers, ensuring fast load times, high uptime, and data security.Our hosting solutions include backups, SSL encryption, and robust defenses against cyber threats, giving you peace of mind.</span>
        </div>
    }
]

const mobiles = [
    {
        image:mobile1,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>U</span>nmatched Expertise </h3>
            <span>With years of experience in creating cutting-edge apps and games, we blend creativity and functionality to deliver top-notch solutions for Android and iOS.</span>
        </div>
    },
    {
        image:mobile2,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>C</span>ustom Solutions</h3>
            <span>We tailor every app and game to meet your unique needs, ensuring they resonate with your audience and stand out in the market.</span>
        </div>
    },
    {
        image:mobile3,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>U</span>ser-Centric Design</h3>
            <span>Our designs focus on intuitive user experiences, making every tap, swipe, and interaction enjoyable and seamless.</span>
        </div>
    },
    {
        image:mobile4,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>S</span>tate-of-the-Art Technology</h3>
            <span>We leverage the latest tools and technologies to create apps and games that are fast, secure, and future-proof.</span>
        </div>
    },
    {
        image:mobile5,
        article:<div className="relative w-[80%] left-[10%] top-[30%]">
            <h3><span style={{fontSize:"250%"}}>A</span>ffordable Pricing</h3>
            <span>Quality doesn’t have to break the bank. We provide premium services at competitive rates. Our hosting solutions include backups, SSL encryption, and robust defenses against cyber threats, giving you peace of mind.</span>
        </div>
    }
]

const marketing = [
    {
        title:<h1 style={{fontSize:"150%",fontStyle:"bold",color:"#411342"}}>Web Design & Development</h1>,
        article:<article style={{textAlign:"justify"}}>Get a high-quality website design & development built by professionals that deliver measurable results.</article>,
        icon:<FontAwesomeIcon style={{fontSize:"200%",color:"#000",textAlign:"center"}} icon={faLaptop}/>
    },
    {
        title:<h1 style={{fontSize:"150%",fontStyle:"bold",color:"#411342"}}>Social Media Marketing</h1>,
        article:<article>Get social media management and advertising with targeted campaigns to Facebook and Instagram customers.</article>,
        icon:<FontAwesomeIcon style={{fontSize:"200%",color:"#000",textAlign:"center"}} icon={faThumbsUp}/>
    },
    {
        title:<h1 style={{fontSize:"150%",fontStyle:"bold",color:"#411342"}}>Search Marketing</h1>,
        article:<article>Get ranked #1 in your industry on different search engines like Google with multiple targeted key words.</article>,
        icon:<FontAwesomeIcon style={{fontSize:"200%",color:"#000",textAlign:"center"}} icon={faMapPin}/>
    },
    {
        title:<h1 style={{fontSize:"150%",fontStyle:"bold",color:"#411342"}}>E-COMMERCE DEVELOPMENT</h1>,
        article:<article>Get complete point of sale integration and online store setup to accept payments into your bank account.</article>,
        icon:<FontAwesomeIcon style={{fontSize:"200%",color:"#000",textAlign:"center"}} icon={faCartShopping}/>
    },
    {
        title:<h1 style={{fontSize:"150%",fontStyle:"bold",color:"#411342"}}>MOBILE APP DEVELOPMENT</h1>,
        article:<article>Get mobile app development that connects to your website for instant updates on IOS & Android Apps.</article>,
        icon:<FontAwesomeIcon style={{fontSize:"200%",color:"#000",textAlign:"center"}} icon={faMobileAndroid}/>
    },
    {
        title:<h1 style={{fontSize:"150%",fontStyle:"bold",color:"#411342"}}>Pro Graphic Design</h1>,
        article:<article>Get professional graphic design from business cards, brochures, posters and much more. Including printing.</article>,
        icon:<FontAwesomeIcon style={{fontSize:"200%",color:"#000",textAlign:"center"}} icon={faPenToSquare}/>
    }
]

export { clients, accreditors, websites, mobiles, marketing }
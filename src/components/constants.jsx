"use clients"
import { faCartShopping, faLaptop, faMapPin, faMobileAndroid, faPenToSquare, faPhone, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
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
        article:<article>Get a high-quality website design & development built by professionals that deliver measurable results.</article>,
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

const blogs = [
    {
        title:"PHISHING",
        header:"PHISHING FOR LATE DEVELOPERS",
        description:<>
            <article style={{textAlign:"justify",width:"80%",marginLeft:"10%"}}>
            <span class = "gradient-text">M</span>odern innovations like smartphones, cloud computing, 
            and social media have given rise to a hyperconnected 
            society and radically transformed the workplace. It has 
            never been easier to keep in touch with your peers around the 
            globe, expand your professional networks, or collaborate with 
            your colleagues. The traditional office-based work model looks 
            increasingly outdated today; with a plethora of digital communi
            cation channels and online tools at their fingertips, today’s teams 
            can work on complex projects without being in the same 
            location.
            However, there are downsides to this high level of digitization. 
            One of the biggest is the fact that it has opened a host of new 
            avenues for cybercriminals to carry out phishing attacks. These 
            attacks can occur anytime and anywhere. Anyone who uses the 
            Internet is vulnerable to them. This chapter introduces you to 
            phishing and goes over some of the basics of phishing including 
            the issues that lead to phishing attacks.
        </article>
        <article style={{textAlign:"justify",width:"80%",marginLeft:"10%"}}>
            <em>Phishing</em> is a type of electronically delivered social engineering 
            attack in which a perpetrator, often posing as a legitimate entity, 
            attempts to obtain sensitive information from an unsuspecting 
            individual or to infect their device with malware. The motivations 
            for phishing attacks vary widely, but often attackers are after 
            valuable user data, such as personally identifiable information 
            or login credentials that can be used to commit fraud or access 
            the victim’s finances. In some cases, they may be trying to steal 
            research, financial data, or health records from an institution. 
            Some attackers may use phishing for social or political gain, as 
            part of a hacktivism campaign, or to cause disruption or spread 
            disinformation.
            Though the practice of phishing is almost as old as the Internet 
            itself, attacks have grown more sophisticated in recent years. It’s 
            not just about email anymore. Multistage, multivector attacks, 
            bypassing traditionally secure multifactor authentication (MFA), 
            have become the norm, and artificial intelligence (AI) chatbots are 
            being used to craft increasingly error-free messages that are more 
            effective in duping recipients into doing what the attacker wants.
            Since the goal of these attacks is usually to trick Internet users 
            into sharing credentials or following a malicious call-to-action 
            (CTA), the consequences of falling prey to an attack can be dire. An 
            IBM report released last year found that phishing was the second
            most common cause of a data breach (accounting for 16 percent 
            of breaches) as well as the costliest, leading to USD 4.91 million in 
            average breach costs for organizations.
            More than ever before, organizations need to be vigilant about the 
            phishing threat and ensure that they have the right tools in place 
            to defend against it. Thankfully, defenses have evolved to keep 
            pace with increasingly sophisticated attacks.
        </article>
        <article style={{textAlign:"justify",width:"80%",marginLeft:"10%"}}>
            <h2>Types of Phishing Attacks</h2>
            <strong>Mass phishing:</strong>This targets a large group of people with a 
            generic message. The attacker may send out thousands or 
            even millions of emails that are identical or similar in content<br/>
            <strong>Spear phishing:</strong>This is a targeted attack in which the 
            attacker researches the victim and customizes the attack to 
            make it appear more credible and convincing. The attacker 
            may use information gathered from social media profiles, 
            public records, or other sources to create a personalized 
            message that appears to be from a trusted source, such as a 
            colleague, boss, or friend, with the intent of tricking the victim 
            into revealing sensitive information or performing a specific 
            action, such as transferring funds or downloading malware.<br/>
            Additionally, phishing attacks can come through a variety of 
            channels, including compromised websites, social media, fake 
            ads, and text messages. While email is the most common attack 
            vector, others include QR codes, workspace collaboration tools, 
            and photo or audio attachments that may lead to advanced steg
            anography attacks (hiding something malicious in a file that looks 
            innocuous).
            A more specific type of attack is called typosquatting, also known 
            as URL hijacking, wherein an attacker registers domain names 
            that are similar to well-known and frequently visited websites 
            with the hope that users will accidentally mistype the legitimate 
            website’s address and land on their fake website instead. These 
            fake websites might look almost identical to the real ones and can 
            be used to phish for users’ login credentials, credit card informa
            tion, or other personal data.
            These materials are © 2023 John Wiley & Sons, Inc. Any dissemination, distribution, or unauthorized use is strictly prohibited.
            Another example is an adversary-in-the-middle (AiTM) attack, 
            also known as a man-in-the-middle (MiTM) attack, which 
            involves the attacker intercepting communication between two 
            parties to secretly eavesdrop, modify, or inject malicious code into 
            the communication. For instance, the attacker 
            may intercept communication between the victim and a trusted 
            organization, such as a bank or an online retailer, and then uses 
            this information to impersonate the organization and trick the 
            victim into providing sensitive information such as login creden
            tials or credit card numbers.<br/>
            <a href="/pdf/blogs/phishing.pdf" target="__blank" style={{fontSize:"150%",textDecoration:"underline",color:"#3457D5"}}>Learn More</a><br/>
            <p>Written by ~Brian Wekesa</p>
            <p>Sources ~CISCO</p>
        </article>
        </>
    }
]

const homeImg = [
    "/image/homes1.jpeg",
    "/image/homes2.jpg",
    "/image/homes3.jpg",
    "/image/homes4.jpg",
    "/image/homes5.avif",
    "/image/homes6.avif",
    "/image/homes7.jpg",
    "/image/homes8.avif",
    "/image/homes9.jpeg"
]

const feedbackHome = [
    {
        img:"/image/bnb1.jpg",
        name:"LYDIA KONA",
        contact:<><FontAwesomeIcon icon={faPhone}/> <span style={{background:"#F6EED8",width:"100%",color:"#000"}}>+254722911960</span></>,
        description:"I had a wonderful experience the entire trip, perfect weather a trip advisor really.The comfort and luxury we experienced came at a surprisingly affordable price, which made the whole experience even better. The kids had a blast, and as a group leader, I had peace of mind knowing we were in good hands.Late Developers didn’t just offer a place to stay; they delivered an exciting, safe, and unforgettable experience. I would highly recommend them to any group, family, or solo traveler looking for the best of Mombasa."
    },
    {
        img:"/image/bnb2.jpg",
        name:"PENINAH MUTENDE",
        contact:<><FontAwesomeIcon icon={faPhone}/> <span style={{background:"#F6EED8",width:"100%",color:"#000"}}>+2547114778743</span></>,
        description:"My recent stay in Mombasa, booked through Late Developers Agency, was nothing short of amazing. From the moment I checked in, I felt completely secure and at ease, thanks to their top-tier security systems. The apartment was modern, clean, and elegantly furnished — offering a perfect balance of luxury and comfort."
    },
    {
        img:"/image/bnb3.jpg",
        name:"WALLACE KINYANJUI",
        contact:<><FontAwesomeIcon icon={faPhone}/> <span style={{background:"#F6EED8",width:"100%",color:"#000"}}>+254728454313</span></>,
        description:"Bringing a group of students for a camping trip in Mombasa could’ve been a logistical nightmare — but thanks to Late Developers Agency, it turned out to be one of the best trips we’ve ever had. The accommodations were not only secure and well-managed, but also incredibly modern and thoughtfully designed.Everything was smooth — from check-in to daily support. "
    },
    {
        img:"/image/bnb4.jpg",
        name:"AYUB ",
        contact:<><FontAwesomeIcon icon={faPhone}/> <span style={{background:"#F6EED8",width:"100%",color:"#000"}}>+255742440033</span></>,
        description:"What stood out the most was how affordable this experience was, without compromising on quality. Every detail, from the smooth digital check-in to the stylish interior design, made my stay truly exciting and memorable. I highly recommend Late Developers for anyone looking for a reliable, luxurious, and modern travel experience."
    }
]
export { clients, accreditors, websites, mobiles, marketing, blogs, homeImg, feedbackHome }
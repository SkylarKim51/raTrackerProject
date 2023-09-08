import '.././App.css';
import '.././index.css';


const About = () => {
    return( 
        <div className="About-Section">
            <p>Welcome to my RA Tracker Project. This is a project that I have been wanting to do since freshman year of 
                college when I was diagnosed with Rheumatoid Arthritis. 
            </p>

            <p> The goal of this application is to:
                <ul>1. Keep data that should commonly be tracked when someone wants to stay on top of their health</ul>  
                <ul>2. Use data analysis to accurately discern what is causing a person's flair ups/swelling</ul>
            </p>

            <p>TechStack: 
                <ul>React.js(FrontEnd), </ul>
                <ul>Node.js(BackEnd), </ul>
                <ul>MongoDB(DataBase) </ul>
                <ul>Additionally this helps me grow more comfortable using git best practices </ul>
            </p>

            <p>How to use:
                <ul>  1. Create a profile using your email and a password </ul>
                <ul> 2. Do your best to make daily entries as accurate as possible </ul>
                <ul> 3. After x amount of entries, use the prediction section to get your report </ul>
                <ul> 4. Give me money and a job </ul>
            </p>
        </div>
    )
};

export default About;
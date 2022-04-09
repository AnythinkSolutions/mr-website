import Image from "next/image";
import FlipCard from "../../components/flip-card/flip-card";

export interface IServicesProps {}

const services = [
  {
    key: "writing",
    title: "Writing",
    description: "I write everything from feature-length, highly-reported feature articles and profiles to Q&amp;As, shorts, and website display copy.",
    image: "/assets/images/services/writing.jpg"
  },
  {
    key: "editing",
    title: "Editing",
    description: "I've held on-staff senior editor roles at national magazines and digital media properties, and I use those skills to ideate, assign articles, and whip copy into shape.",
    image: "/assets/images/services/editing.jpg",
  },
  {
    key: "content",
    title: "Branded Content",
    description: "I work with in-house content labs, content marketing agencies, and directly with brands to produce content that tells a compelling story.",
    image: "/assets/images/services/content.jpg"
  },
  {
    key: "ghost",
    title: "Ghost Writing",
    description: "I've worked with A-list celebrities, CEOs of companies, dietitians, fitness pros, and chefs to ghost write articles for national media outlets, blog posts, books, and more.",
    image: "/assets/images/services/ghost.jpg",
  },
  {
    key: "editstrat",
    title: "Editorial Strategy",
    description: "I work with clients to create comprehensive print and digital media plans that wow readers and deliver on company goals.",
    image: "/assets/images/services/strategy.jpg",
  },
  {
    key: "seo",
    title: "SEO",
    description: "I work with SEO specialists to implement keyword research into content seamlessly, so more readers find your articles but aren’t distracted by clunky keyword phrases or cross-links.",
    image: "/assets/images/services/seo.jpg",
  }
];

const ServicesSection: React.FC<IServicesProps> = () => {
  const imgHeight = 260;
  const imgWidth = 380;

  return (
    <div id="services" className="flex flex-col w-full">
      <div className="container flex items-center mt-4 section-header header">
        <h1>Services</h1>
        <span />
      </div>

      <div className="flex flex-row flex-wrap gap-8 mt-6 justify-center">
        {services.map(svc => (
          <div key={svc.key} >
            <FlipCard title={svc.title} description={svc.description} backColor="sky-200">
              {svc.image ? <Image src={svc.image} alt={svc.title} height={imgHeight} width={imgWidth} objectFit="cover"/> : <span></span>}
            </FlipCard>  
            </div>
          ))}
        {/* <FlipCard title="Writing" description="I write everything from feature-length, highly-reported feature articles and profiles to Q&amp;As, shorts, and website display copy. ">
          <Image src="/assets/images/services/writing.jpg" alt="Writing" height={imgHeight} width={imgWidth}/>
        </FlipCard> */}
      </div>
    </div>
  );
}

export default ServicesSection;
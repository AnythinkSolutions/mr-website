import Image from "next/image";
import EntryMotion, { fadeLeft, fadeRight } from "../../components/entry-motion/entry-motion";

const visState = { opacity: 1, translateX: 0 };
const hidStateR = {opacity: 0, translateX: 100 };
const hidStateL = {opacity: 0, translateX: -100 };

const AboutSection = () => {

  return (
    <div id="about" className="flex flex-col items-center">
      <div className="container my-12 p-4 py-0">
        <div className="flex flex-col">

          <EntryMotion {...fadeRight(100)} duration={0.75}>
            <div className="container flex mb-8">
              <div className="w-2/3 p-8 pl-0 flex flex-col">
                <h1 className="font-medium text-3xl mb-4">Hello!</h1>
                <p className="text-lg font-light">I&apos;m an award-winning journalist who works for national and global media outlets, brands, and companies. I write, assign, and edit stories about health, nutrition, psychology, personal finance, and travel. I also interview well-known experts, authors, and celebrities for feature-length profiles and ghost-written content. As a consulting editor, I use my experience on staff at multiple print and digital media outlets to ideate, assign, write, and edit meaningful content that inspires readers. I can also optimize that content for SEO.</p>
              </div>
              <div className="w-1/3 flex items-center">
                <Image priority src="/assets/images/about/mr-chataqua-square.jpg" alt="Meghan in Boulder" height={300} width={300}/>
              </div>            
            </div>
          </EntryMotion>

          <EntryMotion {...fadeLeft(100)} duration={0.75}>
            <div className="container flex mb-8">
              <div className="w-1/3 flex items-center">
                <Image priority src="/assets/images/about/pic-3.jpg" alt="Meghan at Machu Picchu" height={300} width={300}/>
              </div>
              <div className="w-2/3 p-8 flex flex-col">
                <h1 className="font-medium text-3xl mb-4">I&apos;m a writer and an editor.</h1>
                <p className="text-lg with-links font-light">I&apos;ve held staff roles at Parenting, Alternative Medicine, Natural Health, and Yoga Journal magazines; I was also executive editor of <a href="http://totalbeauty.com/" target="_blank" rel="noreferrer">TotalBeauty.com</a> and <a href="http://yogajournal.com/" target="_blank" rel="noreferrer">YogaJournal.com</a>. Because of my experience writing and editing, I deliver copy editors don&apos;t have to spend hours re-working and I craft assignments writers find streamlined. I help media companies and brands create content strategies that wow readers, create compelling calls to action, and build trust with an audience.</p>
              </div>            
            </div>
          </EntryMotion>

          <EntryMotion {...fadeRight(100)} duration={0.75}>
            <div className="container flex mb-8">
              <div className="w-2/3 p-8 pl-0 flex flex-col">
                <h1 className="font-medium text-3xl mb-4">“Everyone is a feature story.”</h1>
                <p className="text-lg font-light">One of my college journalism professors said this, and after 20+ years of reporting, writing, and editing, I know it to be true. I love talking to people, finding their stories, and helping them share those stories. I love weaving facts and expert advice into those stories. And I love helping brands share stories with their customers through multimedia campaigns.</p>
              </div>
              <div className="w-1/3 flex items-center">
                <Image priority src="/assets/images/about/mr-rome-square.jpg" alt="Meghan in Rome" height={300} width={300}/>
              </div>            
            </div>
          </EntryMotion>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;
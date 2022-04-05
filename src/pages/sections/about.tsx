import Image from "next/image";


const AboutSection = () => {

  return (
    <div id="about" className="bg-slate-50 w-full flex flex-col items-center">
      <div className="container my-12 p-4 py-0">
        <div className="flex flex-col">

          <div className="container flex mb-8" data-aos="fade-left" data-aos-duration="900">
            <div className="w-2/3 p-8 flex flex-col">
              <h1 className="font-bold text-3xl mb-4">Hello</h1>
              <p className="text-lg">I&apos;m an award-winning journalist who writes for national print magazines and digital outlets, including Women&apos;s Health, Men&apos;s Health, Prevention, Good Housekeeping, Oprah Daily, Harper’s BAAZAR, and more. I&apos;m also an experienced branded content writer, working for companies like Johnson &amp; Johnson, Peloton, Levels Health, Under Armour, and many more.</p>
            </div>
            <div className="w-1/3">
              <Image priority src="/assets/images/about/pic-2.jpg" alt="Meghan Rabbitt" height={400} width={400}/>
            </div>
            
          </div>

          <div className="container flex mb-8" data-aos="fade-right" data-aos-duration="900">
            <div className="w-1/3">
              <Image priority src="/assets/images/about/pic-5.jpg" alt="Meghan Rabbitt" height={400} width={400}/>
            </div>
            <div className="w-2/3 p-8 flex flex-col">
              <p className="text-lg">As a consulting editor, I use my experience on staff at multiple news outlets to ideate, assign, write, and edit engaging content that I&apos;m also able to optimize for SEO. I’m a consulting senior editor for Maria Shriver&apos;s weekly newsletter, The Sunday Paper; the editor-in-chief for Scarlet Society, a new digital platform for women over 40; and a contract editor for Xanterra Collection&apos;s travel magazine.</p>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;
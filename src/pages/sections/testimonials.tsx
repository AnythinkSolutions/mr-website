import { useMemo } from "react";
import { IClient, ITestimonial } from "../../utilities/app-types";
import Slider from "react-slick";
import styles from "../../styles/testimonials.module.scss";
import LogoImage, { clientToImageProps } from "../../components/logo-image/logo-image";
import EntryMotion from "../../components/entry-motion/entry-motion";

function TestimonialsSection({testimonials, clients}: {testimonials: ITestimonial[], clients: IClient[]}){
  const SafeSlider = Slider as any;   //TODO: dependency isn't ready for React 18

  const items = useMemo(() => {
    if(testimonials && clients){
      let index = 0;
      const allItems = testimonials
        .filter(tst => !tst.isHidden)   //don't show any that are flagged as hidden
        .sort(tst => tst.order ?? 999)
        .map(tst => {
          if(tst.clientKey){
            const cli = clients.find(cli => cli.key === tst.clientKey);
            return {...tst, clientObject: cli, mapKey: index++};
          }
          return {...tst, mapKey: index++};   //no client key, so just return the item
        });
      return allItems;
    }
    return [];  //don't have the data yet
  }, [testimonials, clients]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
  };

  return (
    <div className="w-full">
      <EntryMotion duration={0.9} eventLabel="testimonials">
        <div className="my-8 p-4 py-0 flex-col">
          <div className="flex flex-col items-center justify-center text-center my-4 ml-4 section-header">
            <h2>What my clients say</h2>
            <div className="gradient_line lg" />
          </div>

          <div className={styles.sliderContainer}>
            <SafeSlider {...settings}>
              {items?.map(item => <Testimonial key={item.mapKey} item={item} />)}
            </SafeSlider>
          </div>

        </div>
      </EntryMotion>
    </div>
  )
};

export default TestimonialsSection;

const Testimonial = ({item}: {item: ITestimonial}) => {
  const logoProps = useMemo(() => clientToImageProps(item?.clientObject), [item?.clientObject]);

  return (
    <div className={styles.testimonialCard}>
      <div className={styles.innerCard}>
        <div className="flex flex-col md:flex-row gap-x-8">
          <div className={`basis-3/5 ${styles.quoteDiv}`}>
            <p className={styles.quote}>{item.quote}</p>
          </div>
          <div className="basis-2/5 flex flex-col pl-12 mt-12 md:mt-0">
            <p className={styles.name}>{item.name}</p>
            <p className={styles.title}>{item.title}</p>
            {item.clientObject?.logo && 
              <div className="flex mt-2 h-12 w-36">
                <LogoImage {...logoProps} size="auto"/>
              </div>
            }
            {!item.clientObject?.logo && 
              <p className={styles.client}>{item.client}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

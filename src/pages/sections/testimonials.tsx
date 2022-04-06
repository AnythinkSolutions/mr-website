import { useMemo } from "react";
// import Image from "next/image";
import { IClient, ITestimonial } from "../../utilities/api-utilities";
import Slider from "react-slick";
import styles from "../../styles/testimonials.module.scss";
import clientStyles from "../../styles/clients.module.scss";
import ClientLogo from "../../components/client-logo";

function TestimonialsSection({testimonials, clients}: {testimonials: ITestimonial[], clients: IClient[]}){

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
    <div id="testimonials" className="w-full flex" data-aos="fade-up" data-aos-duration="900">
      <div className="container my-8 p-4 py-0 flex-col items-center">
        <div className="container">
          <div className="container flex items-center section-header mb-4">
            <h1>What My Clients Say</h1>
            <span/>
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            {items?.map(item => <Testimonial key={item.mapKey} item={item} />)}
          </Slider>
        </div>
      </div>
    </div>
  )
};

export default TestimonialsSection;

const Testimonial = ({item}: {item: ITestimonial}) => {

  return (
    <div className={styles.testimonialCard}>
      <div className={styles.innerCard}>
        <div className="flex flex-row gap-x-8">
          <div className="basis-3/5">
            <p className={styles.quote}>{item.quote}</p>
          </div>
          <div className="basis-2/5 flex flex-col">
            <p className={styles.name}>{item.name}</p>
            <p className={styles.title}>{item.title}</p>
            {item.clientObject?.logo && 
              <div className="flex mt-1">
                <ClientLogo index={0} client={item.clientObject} styles={clientStyles} noAnimation={true}/>
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

// function BackArrow(props:any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block" }}
//       onClick={onClick}
//     >
//       <Image src="/assets/images/arrow-back.png" height={48} width={48} alt="Previous Arrow"/>
//     </div>
//   );
// }
// function ForwardArrow(props:any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block"}}
//       onClick={onClick}
//     >
//       <Image src="/assets/images/arrow-forward.png" height={48} width={48} alt="Next Arrow"/>
//     </div>
//   );
// }
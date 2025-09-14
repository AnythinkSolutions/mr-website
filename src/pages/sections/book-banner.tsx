import styles from "../../styles/book.module.scss"; 

const BookBanner = () => {
  return (
    <div>
      <div className={`flex flex-col w-full ${styles.bookBanner} mb-8`}>
        
        <div className={`${styles.bannerTitle}`}>
          <h1 className={`${styles.titleText}`}>My book, The New Rules of Women's Health, is here!</h1>
        </div>

        <div className={`${styles.bannerContent}`}>
          
          <div className={`${styles.testimonialSection}`}>
            <h1 className={`${styles.testimonialText}`}>"This book belongs in every woman's hands. It needs to go with you to every doctor's appointment. You need to share it with everyone in your life."</h1>
            <p className={`${styles.testimonialAuthor}`}>— Maria Shriver</p>
          </div>

          <div className={`${styles.bookSection}`}>
            <a href="https://www.newrulesofwomenshealth.com" target="_blank" rel="noreferrer">
              <img 
                src="/assets/images/book/book-3d.png" 
                alt="The New Rules of Women's Health book" 
                className={`${styles.bookImage}`}
              />
            </a>
          </div>

          <div className={`${styles.actionSection}`}>
            <h2 className={`${styles.actionTitle}`}>AVAILABLE FOR<br/> <span className="font-bold">PRE-ORDER</span> NOW!</h2>
            
            <a className={`${styles.learnMoreButton}`} href="https://www.newrulesofwomenshealth.com" target="_blank" rel="noreferrer">
              Learn More
            </a>

            <div className={`${styles.logoContainer}`}>
              <div className={`${styles.logoWrapper}`}>
                  <img src="/assets/images/book/prh-logo.svg" alt="Penguin Random House" className={`${styles.retailerLogo}`}/>
              </div>
              <div className={`${styles.logoDivider}`}></div>
              <div className={`${styles.logoWrapper}`}>
                  <img src="/assets/images/book/open-field.png" alt="The Open Field" className={`${styles.retailerLogo}`} style={{ maxHeight: "100px" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookBanner;
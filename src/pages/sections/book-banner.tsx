import styles from "../../styles/book.module.scss"; 

const BookBanner = () => {
  return (
    <div>
      <div className={`flex flex-col w-full ${styles.bookBanner} mb-8`}>
        
        <div className="flex flex-col w-full text-center mb-8">
          <h1 className="text-3xl font-bold">My book, The New Rules of Women's Health, is here!</h1>
        </div>

        <div className="grid grid-cols-3 items-center my-4 py-0 h-full w-full gap-8">
          
          <div className="flex flex-col justify-center h-full w-full px-2 text-center">
            <h1 className="text-3xl font-bold">“This book belongs in every woman’s hands. It needs to go with you to every doctor’s appointment. You need to share it with everyone in your life.”</h1>
            <p className="text-2xl mt-4 w-full text-center">— Maria Shriver</p>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            <a href="https://www.newrulesofwomenshealth.com" target="_blank" rel="noreferrer">
              <img 
                src="/assets/images/book/book-3d.png" 
                alt="The New Rules of Women's Health book" 
                className={`${styles.bookImage}`}
              />
            </a>
          </div>

          <div className="flex flex-col justify-center h-full w-full px-2 text-center">
            <h2 className="text-3xl text-center">AVAILABLE FOR<br/> <span className="font-bold">PRE-ORDER</span> NOW!</h2>
            
            <a className={`mt-8 w-full text-white text-2xl px-4 py-4 rounded-xl cursor-pointer ${styles.learnMoreButton}`} href="https://www.newrulesofwomenshealth.com" target="_blank" rel="noreferrer">
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
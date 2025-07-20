import styles from "../../styles/book.module.scss"; 

const BookBanner = () => {
  return (
    <div>
      <div className={`flex flex-col w-full ${styles.bookBanner}`}>
        <div className="grid grid-cols-2 items-center my-4 py-0 h-full w-full">
          <div className="flex flex-col items-center justify-center h-full w-full px-8 text-center">
            <h1 className="text-3xl font-bold">“This book belongs in every woman’s hands. It needs to go with you to every doctor’s appointment. You need to share it with everyone in your life.”</h1>
            <p className="text-2xl text-right mt-4">— Maria Shriver</p>
            <div className="flex flex-col items-center justify-center w-full text-center mt-12">
              <a className="border-2 border-gray-300 text-white text-xl px-4 py-4 rounded-md w-1/2 cursor-pointer">
                Pre-Order Now
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center relative">
            <img 
              src="/assets/images/book/book-3d.png" 
              alt="The New Rules of Women's Health book" 
              className={`${styles.bookImage}`}
            />
          </div>
        </div>
      </div>
      <div>
        <div 
          className="grid grid-cols-2 items-center h-400"
          style={{ 
            backgroundImage: `url(/assets/images/book/book-background.jpg)`, 
            backgroundSize: "cover", 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.5
          }}
          >
          
        </div>
      </div>
    </div>
  )
}

export default BookBanner;
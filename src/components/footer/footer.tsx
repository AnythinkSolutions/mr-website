import Image from 'next/image';
import styles from './footer.module.scss'

export interface IFooterProps {}

const Footer : React.FC<IFooterProps> = () => {

  return (
    <footer className={styles.footer}>
      <div className="container flex center-items">
        <a href="https://www.anythinksolutions.com" target="_blank" rel="noopener noreferrer">
          Created by{' '}
          <Image src="/assets/images/logos/anythink.svg" alt="Anythink Solutions Logo" width={216} height={48} />            
        </a>
      </div>
    </footer>
  );
};

export default Footer;
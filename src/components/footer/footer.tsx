import Image from 'next/image';
import styles from './footer.module.scss'

export interface IFooterProps {}

const Footer : React.FC<IFooterProps> = () => {

  return (
    <footer className={`flex justify-between items-center p-8 border-t`}>
      <div>
        <span className="font-light">&copy;2022 Meghan Rabbitt, Inc. All rights reserved.</span>
      </div>
      <div className="font-light">
        <a href="https://www.anythinksolutions.com" target="_blank" rel="noopener noreferrer" className=" flex items-center">
          <span>Created by&nbsp;</span>
          <span className="px-2">
            <Image src="/assets/images/logos/anythink.png" alt="Anythink Solutions Logo" width={32} height={32} />
          </span>
          <span>Anythink Solutions, Inc.</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
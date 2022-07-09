import Image from 'next/image';
import Link from 'next/link';
import { networkIconUrls, networksSupported } from '../config';

const Footer = () => {
  return (
    <footer className="py-1 px-4 flex justify-between">
      <div className="flex">
        {Object.keys(networksSupported).map((network) => {
          return (
            <div key={`networkSupported-${network}`} className="pr-2">
              <Image width={'24px'} height={'24px'} src={networkIconUrls[network]} alt={`${network}`} />
            </div>
          );
        })}
      </div>
      <div>
        <Link href={'https://twitter.com/ankurmishra94'} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <Image width={'24px'} height={'24px'} src={'/assets/twitter-logo.png'} alt={`Twitter - @ankurmishra94`} />
          </a>
        </Link>
        <Link href={'https://github.com/ankur014/gekt'} passHref>
          <a className="ml-2" target="_blank" rel="noopener noreferrer">
            <Image width={'24px'} height={'24px'} src={'/assets/github-logo.png'} alt={`Github`} />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

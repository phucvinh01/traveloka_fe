'use client';

import { Button } from '@/components/ui/button';
import LangAndCur from '../LangAndCur';
import Logo from '../Logo';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DialogSignIn from '../DialogSignIn';
import { set } from 'date-fns';
type headerProp = {
  usingScrollEvent: boolean;
}

const Header = (props: headerProp) => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scroll, setScroll] = useState<boolean>(false);
  const { usingScrollEvent } = props;
  //neu usingScrollEvent=true thi moi co su dung event sroll  
  //de check sroll y de set background 
  //neu usingScrollEvent=flase thi mac dinh background=mau trang

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    if (usingScrollEvent == true) {
      window.addEventListener('scroll', handleScroll);
      if (scrollY > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    else {
      setScroll(true);
    }
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [scrollY]);
  return (
    <header
      className={`container sticky flex gap-3 flex-col py-2 top-0 left-0 w-full z-50 h-32
       ${!usingScrollEvent ? 'bg-slate-100 text-gray-900' :
          (scrollY > 20 ? 'bg-slate-100' : 'bg-transparent border-gray-200 ')
        } transition-all duration-300 ease-in-out`}>

      <div className='w-full flex-center '>
        <div className='flex flex-1'>
          <Logo />
        </div>
        <div className='flex-center gap-3'>
          <LangAndCur scroll={scroll} />
          <Button
            variant={'ghost'}
            className={`${scroll ? 'text-black' : 'text-white'
              } transition-colors hover:bg-[rgba(0,0,0,0.25)]  hover:text-white`}>
            Hỗ trợ
          </Button>
          <Button
            variant={'ghost'}
            className={`${scroll ? 'text-black' : 'text-white'
              } transition-colors hover:bg-[rgba(0,0,0,0.25)] hover:text-white`}>
            Hợp tác với chúng tôi
          </Button>

          <div className='flex gap-1'>
            <DialogSignIn scroll={scroll} title='Đăng nhập' />
            <DialogSignIn scroll={scroll} title='Đăng ký' />
          </div>
        </div>
      </div>

      <div className='flex gap-1'>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}><Link href={'/hotel'}>Khách sạn</Link></Button>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}>Vé máy bay</Button>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}>Vé xe khách</Button>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}>Đưa đón sân bay</Button>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}>Cho thuê xe</Button>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}>Hoạt động vui chơi</Button>
        <Button variant={'ghost'} className={`transition-colors ${scroll ? 'text-black' : 'text-white'}`}>More</Button>
      </div>

    </header>
  );
};

export default Header;

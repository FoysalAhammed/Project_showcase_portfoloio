import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";
import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser()

  return (
    <nav className="flexBetween navbar bg-[url('/header-bg.png')] bg-cover">
      <div className='flex-1 flexStart gap-10'>
      <a href="/" className="font-[30px] font-bold">NCryptic</a>
      <a href="/profiles" className="font-[30px] font-bold">Profile</a>
        {/* <Link href='/'>
          <Image
            src='/logo.svg'
            width={116}
            height={43}
            alt='logo'
          />
          
        </Link> */}
        <ul className='xl:flex hidden gap-7'>
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text} >
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

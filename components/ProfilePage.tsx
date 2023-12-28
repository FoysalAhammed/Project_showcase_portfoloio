import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'

import Link from 'next/link'
import Button from "./Button";
import ProjectCard from './ProjectCard';

type Props = {
    user: UserProfile;
}

const ProfilePage = ({ user }: Props) => (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full">
            <div className='flex items-center flex-col w-full'>
                <Image src={user?.avatarUrl} width={100} height={100} className="rounded-[50%]" alt="user image" />
                <p className=" text-[30px] lg:text-4xl md:text-4xl hero-text font-bold mt-10">Md Foysal Ahammed</p>
                <p className="md:text-4xl  text-3xl font-extrabold md:mt-6 mt-5 max-w-lg"> Software  Engineer  <br /> at Ncryptic,Croatia👋</p>
                
                <div className="flex mt-8 justify-around gap-5 w-full flex-wrap">
                    <Button 
                        title="Follow" 
                        leftIcon="/plus-round.svg" 
                        bgColor="bg-light-white-400 !w-max" 
                        textColor="text-black-100" 
                    />
                    <Link href={`mailto:${user?.email}`}>
                        <Button title="Hire Me" leftIcon="/email.svg" />
                    </Link>
                </div>
            </div>

            {user?.projects?.edges?.length > 0 ? (
                <Image
                    src={user?.projects?.edges[4]?.node?.image}
                    alt="project image"
                    width={560}
                    height={560}
                    className='rounded-xl object-contain'
                />
            ) : (
                <Image
                    src="/profile-posttt.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='rounded-xl'
                />
            )}
       </section>

       <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
           <p className="w-full text-left text-lg font-semibold">Recent Work</p>
           
           <div className="profile_projects">
                {user?.projects?.edges?.map(
                    ({ node }: { node: ProjectInterface }) => (
                        <ProjectCard
                            key={`${node?.id}`}
                            id={node?.id}
                            image={node?.image}
                            title={node?.title}
                            name={user.name}
                            avatarUrl={user.avatarUrl}
                            userId={user.id}
                        />
                    )
                )}
            </div>
       </section>
   </section>
)

export default ProfilePage
import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'
import LoadMore from '@/components/LoadMore'
import Link from 'next/link'
import Button from '@/components/Button'
import ProjectCard from '@/components/ProjectCard'
import { fetchAllProjects } from '@/lib/actions'
import Categories from '@/components/Categories'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
type SearchParams = {
    category?: string | null;
    endcursor?: string | null;
  }
  
  type Props = {
    searchParams: SearchParams
  }
  
  type ProjectSearch = {
    projectSearch: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    },
  }
  
  export const dynamic = 'force-dynamic';
  export const dynamicParams = true;
  export const revalidate = 0;
  
  const Profiles = async ({ searchParams: { category, endcursor } }: Props) => {
    const data = await fetchAllProjects(category, endcursor) as ProjectSearch
    const projectsToDisplay = data?.projectSearch?.edges || [];

    return(
        <section className="md:bg-[url('/bg_main.svg')] bg-center bg-cover lg:bg-[url('/bg_main.svg')] xl:bg-[url('/bg_main.svg')]   ">
      <Navbar/>
      <Categories />
        <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full">
            <div className='flex items-center flex-col w-full'>
                <Image src="/profile01.jpg" width={200} height={200} className="rounded-[50%] border-dotted border-2 border-red-500 " alt="user image" />
                <p className=" text-[30px] lg:text-4xl md:text-4xl hero-text font-bold mt-10">Md Foysal Ahammed</p>
                <p className="md:text-4xl  text-3xl font-extrabold md:mt-6 mt-5 max-w-lg"> Software  Engineer  <br /> at Ncryptic,Croatia👋</p>
                
                <div className="flex mt-8  justify-around gap-5 w-full flex-wrap">
                    <Button 
                        title="Follow" 
                        leftIcon="/plus-round.svg" 
                        bgColor="bg-light-white-400 !w-max" 
                        textColor="text-black-100" 
                    />
                    <Link href={`mailto:hanif.mia2233@gmail.com`}>
                        <Button title="Hire Me" leftIcon="/email.svg" />
                    </Link>
                </div>
            </div>
                <Image
                    src="/profile-posttt.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='rounded-xl'
                />
          
       </section>

       <section className="flexStart flex-col lg:mt-28 mt-16 w-full">     
      <p className="w-full text-left text-lg font-semibold">Recent Work</p>
      <section className="projects-grid ">
        {/* {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))} */}
      </section>
      <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
   </section>
   <Footer/>
   </section>
)
        }

export default Profiles

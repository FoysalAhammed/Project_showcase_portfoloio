import { ProjectInterface } from "@/common.types";
import AboutBranding from "@/components/AboutBranding";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JoinUs from "@/components/JoinUs";
import LoadMore from "@/components/LoadMore";
import Navbar from "@/components/Navbar";
import NewsSlider from "@/components/NewsSlider";
import ProjectCard from "@/components/ProjectCard";
import ServiceBanner from "@/components/ServiceBanner";
import SlidGallery from "@/components/SliderGallery";
import { fetchAllProjects } from "@/lib/actions";

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

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
 <>
           <section className="bg-[url('/bg_main.svg')] bg-cover bg-center  ">
      <Navbar/>
      <Categories />
      <Hero/>
    <section className="flexStart flex-col paddings mb-16 ">
    <p className="no-result-text text-center">Comming Soon New Projects</p>
    </section>
    
    </section>
     <NewsSlider/>
     <AboutBranding/>
     <SlidGallery/>
     <ServiceBanner/> 
     <JoinUs/>
    <Footer/>  
 </>
    )
  }

  return (
<>
<section className="bg-[url('/bg_main.svg')] bg-cover bg-center  ">
      <Navbar/>
      <Categories />
      <Hero/>
    <section className="flexStart flex-col paddings mb-16 ">
      <section className="projects-grid ">
{/*         {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          /> */}
        ))}
      </section>
      <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
    
    </section>
     <NewsSlider/>
     <AboutBranding/>
     <SlidGallery/>
     <ServiceBanner/> 
     <JoinUs/>
    <Footer/>  
</>
  )
};

export default Home;

// Home.js
import React, { useEffect  } from "react";

import ServicesGrid from "../components/ServicesGrid";
import androidIcon from "../assets/svg/android-icon.svg";
import seoIcon     from "../assets/svg/seo.svg";
import webIcon     from "../assets/svg/web.svg";
import systemIcon  from "../assets/svg/system.svg";
import AppsCompetition from "../components/AppsCompetition";
import SeoSection from "../components/SeoSection"
import Development from "../components/Development";
import Webdevelopmentsection from "../components/Webdevelopmentsection";




import ScrollToTopButton from '../components/ScrollToTopButton';



const services = [
  { icon: androidIcon, title: "Android", desc: "تطبيقات أندرويد احترافية" },
  { icon: seoIcon,     title: "SEO",     desc: "تهيئة مواقع احترافية" },
  { icon: webIcon,     title: "Web",     desc: "تطوير واجهات متكاملة" },
  { icon: systemIcon,  title: "System",  desc: "أنظمة إدارة متطورة" },
];

export default function Home() {


    useEffect(() => {
      document.title = "منصة منجز للتقنيه";
    }, []);

  return (
    <div style={{ background: "#f8f8ff", minHeight: "60vh", padding: "30px 0 0" }}>
      {/* هونيك نمرّر المصفوفة كمُلحق */}
      <ServicesGrid items={services} />
      <AppsCompetition />
      <SeoSection />
      <Development />
      <Webdevelopmentsection />
 
      
     
    </div>
    
  );
  
  
}


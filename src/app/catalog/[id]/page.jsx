// import ArticleContent from "./[id]/articleContent"
import DetailProduct from "./DetailProduct"
import CatalogSection from "../CatalogSection"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function articles() {
  return (
    <main>
      <Navbar />
        <DetailProduct />
        <CatalogSection />
      <Footer />
    </main>
  )
}
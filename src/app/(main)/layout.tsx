import Headr from "@/src/app/_Components/Header/Headr";
import Footer from "../_Components/footer/Footer";

interface Iprops {
  children: React.ReactNode;
  ukNews: React.ReactNode;
  usNews: React.ReactNode;
}

export default function MainLayout({ children, ukNews, usNews }: Iprops) {
  return (
    <>
      <Headr />
      {children}
      {ukNews}
      {usNews}
      <Footer />
    </>
  );
}

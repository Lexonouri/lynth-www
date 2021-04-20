import Navigation from "./partials/navigation";
import Footer from "./partials/footer";

export default function Layout({children}) {
  return (
    <>
      <Navigation/>

      <main>
        {children}
      </main>

      <Footer/>
    </>
  )
}

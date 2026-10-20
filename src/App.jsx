import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
// import ViewportBottomBlur from './components/ViewportBottomBlur/ViewportBottomBlur'
import Landing from './pages/Landing/Landing'
import About from './pages/About/About'
import WorkCatalogic from './pages/WorkCatalogic/WorkCatalogic'
import WorkTeachSmartSteps from './pages/WorkTeachSmartSteps/WorkTeachSmartSteps'
import WorkAccessAbility from './pages/WorkAccessAbility/WorkAccessAbility'
import Contact from './pages/Contact/Contact'
import Imprint from './pages/Imprint/Imprint'
import NotFound from './pages/NotFound/NotFound'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      {/* <ViewportBottomBlur /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/catalogic" element={<WorkCatalogic />} />
        <Route path="/work/teach-smart-steps" element={<WorkTeachSmartSteps />} />
        <Route path="/work/accessability" element={<WorkAccessAbility />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

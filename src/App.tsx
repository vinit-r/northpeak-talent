import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { routes } from '@/config/routes';
import { Layout } from '@/components/layout/Layout';
import { ToastProvider } from '@/components/ui/Toast';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Industries = lazy(() => import('@/pages/Industries'));
const ForCandidates = lazy(() => import('@/pages/ForCandidates'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const FraudNotice = lazy(() => import('@/pages/FraudNotice'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <ToastProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={routes.about} element={<About />} />
              <Route path={routes.services} element={<Services />} />
              <Route path={`${routes.services}/:slug`} element={<ServiceDetail />} />
              <Route path={routes.industries} element={<Industries />} />
              <Route path={routes.candidates} element={<ForCandidates />} />
              <Route path={routes.contact} element={<Contact />} />
              <Route path={routes.privacy} element={<Privacy />} />
              <Route path={routes.terms} element={<Terms />} />
              <Route path={routes.fraudNotice} element={<FraudNotice />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </MotionConfig>
      </LazyMotion>
    </ToastProvider>
  );
}

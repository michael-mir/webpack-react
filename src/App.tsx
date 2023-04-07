import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Loader } from './components/Loader';

const OtherComponent = React.lazy(() => import('./pages/OtherPage'));
const AnotherComponent = React.lazy(() => import('./pages/AnotherPage'));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path='/other'
        element={
          <Suspense fallback={<Loader />}>
            <OtherComponent />
          </Suspense>
        }
      />
      <Route
        path='/another'
        element={
          <Suspense fallback={<Loader />}>
            <AnotherComponent />
          </Suspense>
        }
      />
      <Route path='/' element={<Navigate to='/other' />} />
    </Routes>
  </BrowserRouter>
);

export default App;

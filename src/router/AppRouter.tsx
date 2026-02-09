import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen, NotFoundScreen } from '@/screens';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </Router>
);

export default AppRouter;
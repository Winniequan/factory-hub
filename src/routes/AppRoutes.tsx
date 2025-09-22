import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SearchResults from '../pages/SearchResults';
import FactoryDetails from '../pages/FactoryDetails';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import { ROUTES } from '../constants/routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.SEARCH} element={<SearchResults />} />
      <Route path={ROUTES.FACTORY_DETAILS} element={<FactoryDetails />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />}/>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.CONTACT} element={<Contact />}></Route>
    </Routes>
  );
}

export default AppRoutes;
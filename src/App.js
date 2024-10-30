import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EntryPage from './components/EntryPage/entry_page';
import SignUp from './components/Authentication/signup';
import Customization from './components/Customization/customize_page';
import WorkerHomePage from './components/HomePage/WorkerHomePage';
import SeekerHomePage from './components/HomePage/SeekerHomePage';
import Reviews from './components/HomePage/reviews_seeker';
import Reviews_Worker from './components/HomePage/reviews_worker';
import Seeker_Setting from './components/HomePage/seeker_settings';
import Worker_Setting from './components/HomePage/worker_setting';
import Search_Bar_Seeker from './components/SearchBar/search_bar_seeker';
import Search_Bar_Worker from './components/SearchBar/search_bar_worker';
import WorkerView from './components/HomePage/workerView';
import SeekerView from './components/HomePage/seekerView';
import Forgot from './components/Authentication/forgot';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} exact/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customize/:userId" element={<Customization />} />
        <Route path="/WorkerHomePage/:userId" element={<WorkerHomePage />} />
        <Route path="/SeekerHomePage/:userId" element={<SeekerHomePage />} />
        <Route path="/reviews_seeker/:userId" element={<Reviews />} />
        <Route path="/reviews_worker/:userId" element={<Reviews_Worker />} />
        <Route path="/seeker_settings/:userId" element={<Seeker_Setting />} />
        <Route path="/worker_setting/:userId" element={<Worker_Setting />} />
        <Route path="/search_bar_seeker/:userId" element={<Search_Bar_Seeker />} />
        <Route path="/search_bar_worker/:userId" element={<Search_Bar_Worker />} />
        <Route path="/workerView/:userId" element={<WorkerView />} />
        <Route path="/seekerView/:userId" element={<SeekerView />} />
        <Route path="/forgot" element={<Forgot />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

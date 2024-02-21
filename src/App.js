import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Contato from './components/pages/Contato';
import Company from './components/pages/Company';
import NewProject from './components/pages/projetos/newProject/NewProject';
import Container from './components/layout/Container';
import Navbar from './components/layout/navbar/Navbar';
import Projetos from './components/pages/projetos/Projetos';
import Footer from './components/layout/footer/Footer';
import EditProject from './components/pages/projetos/Edit/EditProject';

function App() {
  return (
    <Router>
        <Navbar />
        <Container customClass="min-height">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projetos" element={<Projetos/>} />
                <Route path="/contato" element={<Contato/>} />
                <Route path="/campany" element={<Company/>} />
                <Route path="/newproject" element={<NewProject/>} />
                <Route path='/projeto/:id' element={<EditProject/>}/>
            </Routes>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Students from './pages/students';
function App() {
    return (
        <Routes>
            <Route path="/" element={<Students />} />
        </Routes>
    );
}

export default App;

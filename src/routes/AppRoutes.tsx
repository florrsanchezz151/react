import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Componentes from '../pages/Componentes';
import Administracion from '../pages/Administracion';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoutes';


const AppRoutes: React.FC = () =>{ 
    
    return(
        <Routes>
                <Route path='/homePage' element={<HomePage/>}/>
                <Route path='/componentes' element={<Componentes/>}/>
               {/* usamos el PrivateRoute porque queremos que la ruta sea privada */}
            <Route element={<PrivateRoute element={<Administracion />} />} path="/administracion" />
            <Route element={<Login />} path="/login" />

        </Routes>
    )
}

export default AppRoutes;
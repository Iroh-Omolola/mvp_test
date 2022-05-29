import './App.css';
import {Navigate, useRoutes} from "react-router-dom";
import 'antd/dist/antd.min.css';
import Dashboard from './views/app-views/Dashboard/dashboard';


const App = () => {


  const routes = useRoutes([
  
    { path: '*',element:<Dashboard /> }
  ]);

  return [routes]
  
};

 


export default App;




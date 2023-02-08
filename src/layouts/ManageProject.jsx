import React from 'react'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/nav';
import axios from 'axios';
import { endpointsURL } from '../api/endpoints';
import { Button , Typography , CircularProgress} from '@mui/material';
import { replace } from 'formik';

export const ManageProject = () => {
    const [projects, setProjects] = React.useState({})
    const [user, setUser] = React.useState({})
    const [ready, setReady] = React.useState(false)
    const  auth  = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
            async function fetchData() {
              const response = await axios.get('http://127.0.0.1:8000/projects/project-created/',
              { headers: { 
                'Content-Type': 'application/json' ,
                  "Authorization" : `Bearer ${auth?.user?.access}`} });
                  setProjects(response.data);
                  setReady(true)
              console.log("azzz",response.data);
            }
            fetchData();
          }, [auth]);

    console.log(projects);
        
    return (
        <>
      <ResponsiveAppBar/>
        <Grid
        padding={10}
        container
        direction="row"
            justifyContent="center"
            alignItems="center"
            >
            
         { !ready ? <CircularProgress /> :  projects?.map((project) => {
             return (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={project.id}>
                            <Grid container columnGap={5} xs={12}>
                                <Typography>
                                    {project.title} 
                                </Typography>
                                <Typography>
                                    {project.description} 
                                </Typography>
                                <Button onClick={()=> navigate(`edit/${project.id}/${project.title}/${project.description}` )}>
                                    manage
                                </Button >
                        </Grid>
                    </Grid>
                    )
                    })
        }
                    </Grid>
                    </>


    )
}


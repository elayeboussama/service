import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { PrivilegeTable } from '../components/projectAdminsTable'
import { TextField} from '@mui/material'
import { ManageDialog } from '../components/dialogue'
import { useParams } from 'react-router-dom'

export const EditProject = () => {
  console.log("heyzzzz")
  let {id , title : paramTitle, description : paramDescription} = useParams()
  console.log(id , paramTitle , paramDescription)
  const [title, setTitle] = React.useState(paramTitle )
  const [description, setDescription] = React.useState(paramDescription)
  const [admins , setAdmins] = React.useState([{name :'farhat' , role : "admin" , id : "1"} , {name :'aziyaz' , role : "admin" , id : "2"}])
  const [viewers , setViewers] = React.useState([{name :'jilani' , role : "viewer" , id : "3"} , {name :'tijani' , role : "viewer" , id : "4"}])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteProject = () => {
    
         

 
  }
  const handleSubmit = () => {
    console.log('submit')
  }

  React.useEffect(() => {
   // fetchEmployees()
    // console.log("useEffect");
    // const employees = axios.get(endpointsURL.customerCompanyNames).then(response => { setAdmins(response.data) });
    // const customersNames = axios.get(endpointsURL.supplierCompanyNames).then(response => response.data );
    // Promise.all([supliersNames, customersNames]).then((values) =>  setCompanyNames([...values[0].concat(values[1])]))
  }, [ open])

  return (
    <Grid container padding={5}  
    direction="row"
    justifyContent="space-between"
    alignItems="center">
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <div>EDIT PROJECT</div>
      <Button variant="contained" color="error"  onClick={deleteProject}> delete project</Button>
          <TextField
              value={title}
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          <TextField
              value={description}
              margin="normal"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
            
      <Button variant="contained" color="success" onClick={() => {
        handleClickOpen()
      }}>add member</Button >
      <br />
      <div>PROJECT MEMBERS</div>
      <br />
      <PrivilegeTable data={[...admins , ...viewers]} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >update project</Button>
          </Box>
      <ManageDialog open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} id={id}  />
    </Grid>
  )
}

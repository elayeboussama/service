import React, { useEffect } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, Select } from '@mui/material'
import { PrivilegeTable } from '../components/projectAdminsTable'
import { TextField} from '@mui/material'
import { ManageDialog } from '../components/dialogue'
import { Link, useNavigate , useParams} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from '../api/axios';


export const EditProject = () => {
  console.log("heyzzzz")
  const navigate = useNavigate();
  const auth = useAuthContext(); 
  let {id , title : paramTitle, description : paramDescription, status : paramStatus, role: paramRole} = useParams()
  console.log(id , paramTitle , paramDescription)
  const [title, setTitle] = React.useState(paramTitle)
  const [description, setDescription] = React.useState(paramDescription)
  const [status, setStatus] = React.useState(paramStatus)
  const [role, setRole] = React.useState(paramRole)
  // const [admins , setAdmins] = React.useState([{name :'farhat' , role : "admin" , id : "1"} , {name :'aziyaz' , role : "admin" , id : "2"}])
  const [admins, setAdmins] = React.useState()
  const [permission, setPermission] = React.useState("admin")
  const [selectedMember, setSelectedMember] = React.useState<string | null>(null);
  const [fullWidth, setFullWidth] = React.useState(true);




  const [memebers , setMembers] = React.useState([])
  const [update , setUpdate] = React.useState(false)



  // const [viewers , setViewers] = React.useState([{name :'jilani' , role : "viewer" , id : "3"} , {name :'tijani' , role : "viewer" , id : "4"}])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
    setUpdate(false);
    setUpdate(true);
  };
  

  useEffect(()=>{
    if(status=="1"){
      setStatus("open")

    } 
    if(status=="2"){
      setStatus("closed")

    }
    if(status=="0"){
      setStatus("not verified yet")
    }


  },[status])
  const deleteProject = () => {
    
    axios.delete("http://127.0.0.1:8000/projects/project-delete/"+id+"/", 
      {
        headers: { 'Content-Type': 'application/json',
                    "Authorization": `Bearer ${auth?.user?.access}`,
      },
      


      

      }
        ).then((response) => {
          // TODO: remove console.logs before deployment
      
          navigate("/", { replace: true })

  

      }).catch((err)=>{
        if (!err) {
          console.log('No Server Response');
        }  else {
          console.log(err)
          console.log('No data' )
        }
      }) ;

 
  }
  const handleUpdateProject = () => {
    axios.post("http://127.0.0.1:8000/projects/project-update/"+id+"/", {title:title,description:description},
    {
      headers: { 'Content-Type': 'application/json',
                  "Authorization": `Bearer ${auth?.user?.access}`,
        },
        


        

        }
      ).then((response) => {
        // TODO: remove console.logs before deployment
        setTitle(response.data.title)
        setDescription(response.data.description)
        setStatus(response.data.status)
        setRole(response.data.role)
        console.log("zzzssz",response.data)
         navigate(`/activeProjects/edit/${id}/${response.data.title}/${response.data.description}/${response.data.status}/admin`, { replace: true })
        


    }).catch((err)=>{
      if (!err) {
        console.log('No Server Response');
      }  else {
        console.log(err)
        console.log('No data' )
      }
    }) ;
  }


   React.useEffect(   ()=>{

        axios.get("http://127.0.0.1:8000/projects/project-members/list/"+id+"/", 
          {
            headers: { 'Content-Type': 'application/json',
                          "Authorization": `Bearer ${auth?.user?.access}`,
            },
            


        

          }
          ).then((response) => {
                // TODO: remove console.logs before deployment
              console.log("zzzzzz:",JSON.parse(response?.data));

              setMembers(JSON.parse(response?.data))
        

    
   
          }).catch((err)=>{
            if (!err) {
              console.log('No Server Response');
            }  else {
                console.log(err)
                console.log('No data' )
            }
          }) ;

    },[ update])//



    const refresh= async () =>{
      await axios.get("http://127.0.0.1:8000/projects/project-members/list/"+id+"/", 
          {
            headers: { 'Content-Type': 'application/json',
                          "Authorization": `Bearer ${auth?.user?.access}`,
            },
            


        

          }
          ).then((response) => {
                // TODO: remove console.logs before deployment
              console.log("zzzzzz:",JSON.parse(response?.data));

              setMembers(JSON.parse(response?.data))
        

    
   
          }).catch((err)=>{
            if (!err) {
              console.log('No Server Response');
            }  else {
                console.log(err)
                console.log('No data' )
            }
          }) ;
    } 




 const addMember = async () => { 

          const body = { id_project: id, id_user : selectedMember, user_role : permission }
          await axios.post("http://127.0.0.1:8000/projects/project-members/register/",
        JSON.stringify(body),
          {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
        ).then(async (response) => {
           console.log(response)
           await refresh();
          if(response.status === 200){
               await handleClose()

          }
          setUpdate(false)
          setUpdate(true)

          //navigate(`/`, { replace: true })

        }).catch((err)=>{ 

        }) 

}


 const fetchEmployees = async () => {

  await axios.get("http://127.0.0.1:8000/employees/customer/list/",
      {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${auth?.user?.access}`
          }
      }
  ).then((response) => {
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",JSON.parse(response.data))
      // console.log(response.data)
      setAdmins(JSON.parse(response.data) )

       
  });
}

 React.useEffect(() => {
 
  fetchEmployees() 

}, [])

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
      
      <Box component="form"   noValidate sx={{ mt: 1 }}>
        <div>EDIT PROJECT</div>
          <Button variant="contained" color="error" disabled={role==="viewer"}  onClick={deleteProject}> delete project</Button>
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
            <TextField
              value= {status}
              margin="normal"
              required
              fullWidth
              id="status"
              label="status"
              name="status"
              autoComplete="status"
              
              multiline
              disabled
            />
            
      <Button variant="contained" disabled={role==="viewer"} color="success" onClick={handleClickOpen}>add member</Button >
      <br />


        {role!=="viewer"?

          <>
          
              {memebers.length>0 || update?
              
                  <>
                      <div>PROJECT MEMBERS</div>
                      <br />
                      <PrivilegeTable refresh={refresh} setMembers={setMembers}   setUpdate={setUpdate}  disable={role==="viewer"} id={id} status={paramStatus} description={description} title={title} role={role} data={[...memebers]} />  
                  </>
                :""
            
            }
          
          
          </>
        
        :""
        
        }



      <Button
      disabled={role==="viewer"} 
      onClick={handleUpdateProject}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >update project</Button>
    </Box>
    <ManageDialog open={open} handleClose={handleClose}  id={id} status={paramStatus} description={description} title={title} setUpdate={setUpdate} role={role} refresh={refresh}/>


    {/* <Dialog
            fullWidth={fullWidth}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>manage project members</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    add member to the project
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        m: 'auto',
                        width: 'fit-content',
                    }}
                >
                    <FormControl sx={{ mt: 2, minWidth: 120 }}>

                        <label>select from users</label>
                        <br />

                        <Select
                            autoFocus
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value as string)}
                            label="admins"
                        >
                            {admins?.map((admin) => {
                                return (
                                    <MenuItem key={admin[0]} value={admin[0]}>
                                        {admin[1][0].username}
                                    </MenuItem>
                                );
                            })
                            }
                        </Select>
                    </FormControl>


                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                        <label>permission type</label>
                        <br />
                        <Select
                            autoFocus
                            value={permission}
                            onChange={(e) => setPermission(e.target.value as string)}
                            label="permission"
                        ><MenuItem value={"admin"}>
                                admin
                            </MenuItem>
                            <MenuItem value={"viewer"}>
                                viewer
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={addMember}>Save</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog> */}
    </Grid>
  )
}

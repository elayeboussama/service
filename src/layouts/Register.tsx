import  {  useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from '../api/axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, Divider, FormControl, FormControlLabel, Modal } from '@mui/material';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { endpointsURL } from '../api/endpoints';
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [companyNames, setCompanyNames] = useState([]) /// TODO: change it to useState([])
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState<'customer' | 'supplier' | null>(null);
  const [isNewCompany, setisNewCompany] = useState(false);
  const [address, setAddress] = useState('');
  const [ProjectSize , setProjectSize] = useState('');
  const [Expertise , setExpertise] = useState('');
  const [employeesNumber, setEmployeesNumber] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const supliersNames = axios.get(endpointsURL.customerCompanyNames).then(response => response.data );
    const customersNames = axios.get(endpointsURL.supplierCompanyNames).then(response => response.data );
    Promise.all([supliersNames, customersNames]).then((values) =>  setCompanyNames([...values[0].concat(values[1])]))
  },[endpointsURL])
  console.log({companyNames});
  console.log('rendering');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log("eeee",{company_id: companyName , company_type: companyName})
    console.log("eeee",{...companyNames.filter(e=> companyName==e.company_name )[0] }.id)


    await axios.post(endpointsURL.register,
        JSON.stringify({ username: user, email: email, first_name: firstname, last_name: lastname, password: pwd, is_active:false, company_id: {...companyNames.filter(e=> companyName==e.company_name )[0] }.id , company_type: {...companyNames.filter(e=> companyName==e.company_name )[0] }.company_type }),
        {
          headers: { 'Content-Type': 'application/json'},

        }
      ).then((response) => {
        // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      
      setUser('');
      setPwd('');
      setMatchPwd('');
      setfirstname('');
      setlastname('');
      setEmail('');
      navigate('/login', { replace: true });
      }).catch((err)=>{
        if (!err) {
          console.log('No Server Response');
        } else if (err.response?.status === 409) {
          console.log('Username Taken');
        } else {
          console.log('Registration Failed')
        }
      }) ;
    



      // if(!isNewCompany){
        
      //   await axios.post("http://127.0.0.1:8000/employees/customer/register/",
      //     JSON.stringify({  company_name: companyName, company_id: companyNames.map(e=>{if(companyName == e.company_name){return e.id} })[0] , company_type: companyNames.map(e=>{if(companyName == e.company_name){return e.company_type} })[0]   }),
      //     {
      //       headers: { 'Content-Type': 'application/json' },
  
      //     }
      //   ).then((response) => {
      //     // TODO: remove console.logs before deployment
      //   console.log(JSON.stringify(response?.data));
        
      //   setUser('');
      //   setPwd('');
      //   setMatchPwd('');
      //   setfirstname('');
      //   setlastname('');
      //   setEmail('');
      //   navigate('/login', { replace: true });
      //   }).catch((err)=>{
      //     if (!err) {
      //       console.log('No Server Response');
      //     } else if (err.response?.status === 409) {
      //       console.log('Username Taken');
      //     } else {
      //       console.log('Registration Failed')
      //     }
      //   }) ;
      // }





    //create company 
   

      
    
    
    
    }


    const handleCreateCompany = async()=>{
      if(companyType== "customer"){
        await axios.post("http://127.0.0.1:8000/companies/customer/register/",
          JSON.stringify({ company_name: companyName, adress: address, employees_number: employeesNumber, company_type: companyType }),
          {
            headers: { 'Content-Type': 'application/json' },
  
          }
        ).then((response) => {
          // TODO: remove console.logs before deployment
          console.log(JSON.stringify(response?.data));
          window.location.reload(true);
        setUser('');
        setPwd('');
        setMatchPwd('');
        setfirstname('');
        setlastname('');
        setEmail('');
        }).catch((err)=>{
          if (!err) {
            console.log('No Server Response');
          } else if (err.response?.status === 409) {
            console.log('Username Taken');
          } else {
            console.log('Registration Failed')
          }
        }) ;
      }
      else if( companyType == "supplier"){
        await axios.post("http://127.0.0.1:8000/companies/supplier/register/",
          JSON.stringify({ company_name: companyName, adress: address, employees_number: employeesNumber, company_type: companyType, project_size: ProjectSize, expertise:Expertise }),
          {
            headers: { 'Content-Type': 'application/json' },
  
          }
        ).then((response) => {
          // TODO: remove console.logs before deployment
        console.log(JSON.stringify(response?.data));
        window.location.reload(true);
        setUser('');
        setPwd('');
        setMatchPwd('');
        setfirstname('');
        setlastname('');
        setEmail('');
        }).catch((err)=>{
          if (!err) {
            console.log('No Server Response');
          } else if (err.response?.status === 409) {
            console.log('Username Taken');
          } else {
            console.log('Registration Failed')
          }
        }) ;
      }
    }


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      borderRadius: 5,
      boxShadow: 24,
      p: 4,
    
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControlLabel control={<Checkbox 
            checked={ isNewCompany  } 
            onChange={()=>{setisNewCompany(prev => !prev);setOpen(prev => !prev)}} />
            }label="create new company" />
            {
            !isNewCompany ? 
            
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">companyName</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyName}
                label="companyName"
                onChange={(e) => {
                  setCompanyName(e.target.value)
                  console.log(e.target.value)
                }}
              >
                {companyNames.map(name => <MenuItem value={name.company_name}>{name.company_name}</MenuItem>)}
              </Select>
            </FormControl> : 
              ""
            }
            <TextField
              value={user}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              value={firstname}
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="firstname"
              name="firstname"
              autoComplete="firstname"
              onChange={(e) => setfirstname(e.target.value)}
            />
            <TextField
              value={lastname}
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="lastname"
              name="lastname"
              autoComplete="lastname"
              onChange={(e) => setlastname(e.target.value)}
            />
            <TextField
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              value={pwd}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPwd(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Sign Up</Button>
            <Grid container>
              <Grid item xs>
                {
                  <Link to="/login" >
                    Already Have an account Sign In ?
                  </Link>
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Modal
                open={open}
                onClose={()=>{setOpen(false);setisNewCompany(prev => !prev)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                    <Typography sx={{marginBottom: 3, textAlign:"center",fontWeight:"bold"}}  id="transition-modal-title" variant="h6" component="h2">
                      Create new company
                    </Typography>
                    <Divider />
                    <TextField
                      value={companyName}
                      margin="normal"
                      required
                      fullWidth
                      id="companyName"
                      label="companyName"
                      name="companyName"
                      autoComplete="companyName"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <TextField
                      value={address}
                      margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="address"
                      name="address"
                      autoComplete="address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      value={employeesNumber}
                      margin="normal"
                      required
                      fullWidth
                      id="employeesNumber"
                      label="Employees Number"
                      name="employeesNumber"
                      autoComplete="Employees Number"
                      type="number"
                      onChange={(e) => setEmployeesNumber(e.target.value)}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">companyType</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={companyType}
                        label="companyType"
                        onChange={(e) => setCompanyType(e.target.value as 'customer' | 'supplier' | null)}
                      >
                        <MenuItem value={'customer'}>customer</MenuItem>
                        <MenuItem value={'supplier'}>supplier</MenuItem>
                      </Select>
                    </FormControl>
                    {companyType === 'supplier' ? 
                    <>
                    <TextField 
                    value={ProjectSize}
                    margin="normal"
                    required
                    fullWidth
                    id="ProjectSize"
                    label="Project size"
                    name="ProjectSize"
                    autoComplete="ProjectSize"
                    onChange={(e) => setProjectSize(e.target.value)}
                    />  
                    <TextField
                      value={Expertise}
                      margin="normal"
                      required
                      fullWidth
                      id="Expertise"
                      label="Expertise"
                      name="Expertise"
                      autoComplete="Expertise"
                      onChange={(e) => setExpertise(e.target.value)}
                    /> 
                    
                    
                    
                    </> : null
                    }
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleCreateCompany}
                    >Create Company</Button>
                </Box>
              </Modal>
      </Container>
      
    </ThemeProvider>
  );
}
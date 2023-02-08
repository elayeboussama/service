import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const ManageDialog = ({
    id,
    handleClickOpen,
    handleClose,
    open
}: {
    id: any,
    handleClickOpen: () => void,
    handleClose: () => void,
    open: boolean
}) => {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [admins, setAdmins] = React.useState()
    const [permission, setPermission] = React.useState("admin")
    const [selectedMember, setSelectedMember] = React.useState<string | null>(null);
    const auth = useAuthContext()
    const handleSubmit = () => {
        addMember()
        console.log('submit', selectedMember, permission)
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
            console.log(response)
            let employees  = [] ;
            response?.data?.forEach((employee: any) => employees.push(employee))
            setAdmins(employees )
        });
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
    ).then((response) => {
        console.log(response)
        if(response.status === 200){

            handleClose()

        }

    });
    }
    React.useEffect(() => {
        fetchEmployees()
    }, [])

    return (
        <Dialog
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
                                    <MenuItem key={admin.user_id} value={admin.user_id}>
                                        {admin.user_id}
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
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
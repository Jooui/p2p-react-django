import './admin.users.css'
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import EditUserModal from './EditUser/admin.editUsers';
import UserService from 'services/user.service';

const AdminUsers = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true)
    const [rows, setRows] = useState()
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        UserService.getUsers().then((data) => {
            setRows(data.results)
            setLoading(false)
            console.log(data.results);
        })
    }, [])


    const columns = [
        {
            field: 'edit',
            headerName: 'Edit',
            description: 'This column is not sortable.',
            sortable: false,
            width: 100,
            renderCell: () => {
                return (<Button variant="contained" color="primary" size="small" onClick={handleOpenModal}><EditOutlined /></Button>)
            },
        },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 250 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'image', headerName: 'Image', width: 250 },

        {
            field: 'delete',
            headerName: 'Delete',
            description: 'This column is not sortable.',
            sortable: false,
            width: 100,
            renderCell: () => {
                return (<Button variant="contained" color="secondary" size="small"><DeleteOutlined /></Button>)
            },
        },
    ];

    return (
        <>
            {
                loading ? null :
                    <div className="adminUsersPage">
                        <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection={false} />
                        <EditUserModal user={""} visibleModal={modalVisible} setVisibleModal={setModalVisible} />
                    </div>
            }
        </>

    )
}

export default AdminUsers
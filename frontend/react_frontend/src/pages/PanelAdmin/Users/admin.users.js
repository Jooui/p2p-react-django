import './admin.users.css'
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import { useState } from 'react';
import EditUserModal from './EditUser/admin.editUsers';

const AdminUsers = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true)
    }

    const columns = [
        {
            field: 'edit',
            headerName: 'Edit',
            description: 'This column is not sortable.',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (<Button variant="contained" color="primary" size="small" onClick={handleOpenModal}><EditOutlined /></Button>)
            },
        },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            valueGetter: (params) =>
                `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
        
        {
            field: 'delete',
            headerName: 'Delete',
            description: 'This column is not sortable.',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (<Button variant="contained" color="secondary" size="small"><DeleteOutlined /></Button>)
            },
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <div className="adminUsersPage">
            <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection={false} />
            <EditUserModal user={""} visibleModal={modalVisible} setVisibleModal={setModalVisible}/>
        </div>
    )
}

export default AdminUsers
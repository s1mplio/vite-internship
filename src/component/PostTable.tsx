import { useState, useEffect} from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Post from '../models/Post'; // Import the Post interface

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
  { field: 'name', headerName: 'name', width: 300 },
  { field: 'species', headerName: 'species', width: 500 },
  { field: 'gender', headerName: 'gender', width: 500 },
  { field: 'origin.name', headerName: 'origin', width: 500,
  valueGetter: (params) => params.row.origin.name  },
];

function PostTable() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch data from API
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        const species = response.data.results;
        setPosts(species);
    console.log(posts)
       
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={posts} columns={columns}   getRowId={(row) => row.id} />
      
    </div>
  );
}

export default PostTable;
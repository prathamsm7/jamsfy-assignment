import {
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

const Table = ({ products, modalOpen, setSelectedIndex, handleDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <table>
        <TableHead sx={{ textAlign: 'left', paddingLeft: '20px' }}>
          <TableRow>
            <TableCell
              sx={{
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bolder',
                color: 'white',
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bolder',
                color: 'white',
              }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bolder',
                color: 'white',
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bolder',
                color: 'white',
              }}
            >
              Rating
            </TableCell>
            <TableCell
              sx={{
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bolder',
                color: 'white',
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => {
              const { title, category, price, rating } = product;
              return (
                <tr key={product.title}>
                  <TableCell sx={{ width: 600, border: '1px solid #5a5a5a' }}>
                    {title}
                  </TableCell>
                  <td>{category}</td>
                  <td>{price}</td>
                  <td>{rating.rate}</td>
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      borderTop: '1px solid #5a5a5a',
                      borderBottom: 'none',
                    }}
                  >
                    <EditIcon
                      onClick={() => {
                        modalOpen(product);
                        setSelectedIndex(index);
                      }}
                    />
                    <DeleteForeverIcon
                      onClick={() => handleDelete(product.id)}
                    />
                  </TableCell>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component='div'
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;

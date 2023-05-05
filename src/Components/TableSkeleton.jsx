import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const TableSkeleton = () => {
  return (
    <Table sx={{ minWidth: '650px' }} aria-label='table skeleton'>
      <TableHead>
        <TableRow>
          <TableCell>
            <Skeleton variant='text' animation='wave' />
          </TableCell>
          <TableCell>
            <Skeleton variant='text' animation='wave' />
          </TableCell>
          <TableCell>
            <Skeleton variant='text' animation='wave' />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 5 }, (_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton
                variant='text'
                animation='wave'
                sx={{ bgcolor: 'grey.900' }}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                variant='text'
                animation='wave'
                sx={{ bgcolor: 'grey.900' }}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                variant='text'
                animation='wave'
                sx={{ bgcolor: 'grey.900' }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;

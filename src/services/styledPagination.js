import { makeStyles } from '@material-ui/core/styles';

const StyledPagination = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 0',
    '& .MuiPaginationItem-page.Mui-selected, & .MuiPaginationItem-page.Mui-selected:hover, & .MuiPaginationItem-page.Mui-selected.Mui-focusVisible,  & .MuiPaginationItem-page:hover, & .MuiPaginationItem-page.Mui-focusVisible': {
      backgroundColor: 'red',
    },
    '& .MuiPaginationItem-root': {
      color: 'white',
    },
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
});

export default StyledPagination;

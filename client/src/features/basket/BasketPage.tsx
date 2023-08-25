import { BasketItem } from '../../app/models/basket';
import { Typography, Box, Grid, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeBasketItemAsync ,addBasketItemAsync} from './basketSlice';

export default function BasketPage() {
  const { basket,status} = useAppSelector(state=>state.basket); 
  const dispatch = useAppDispatch();
 
  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row: BasketItem) => (
              <TableRow
                key={row.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(row.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    loading={status==='pendingRemoveItem'+row.productId}
                    onClick={() =>dispatch(removeBasketItemAsync({productId:row.productId,quantity:1}))}>
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={status==='pendingAddItem'+row.productId}
                    onClick={() =>dispatch(addBasketItemAsync({productId:row.productId,quantity:1}))}>                  
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((row.price * row.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={status==='pendingRemoveItem'+row.productId+'del'}
                    onClick={() =>dispatch(removeBasketItemAsync({productId:row.productId,quantity:row.quantity, name:'del'}))}>                   
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button href="/checkout" variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

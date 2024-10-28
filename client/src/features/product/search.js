import React from 'react'
import { Typography, TextField, Button, Box, Container } from '@mui/material'
import Products from './products';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../reducers/productSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const Search = () => {
  const [keyword , setKeyword] = useState()
const dispatch = useDispatch()
const product = useSelector(state=>state.product)
const handleSubmit = async() =>{
  dispatch(searchProducts(keyword))
}
useEffect(() => {
  // dispatch(searchProducts(keyword))
// console.log(product)
 
}, [keyword]);


  return (
<>
    <Container sx={{ maxWidth: '100%' }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Search products
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="search"
                label="Search Products"
                name="keyword"
                autoComplete="search"
                autoFocus
                onChange = {(e)=>setKeyword(e.target.value)}
                // onInput ={(values) => searchProducts(values.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Search
              </Button>
            </Box>
          </Box>
          <Box>
            {product && <Products pro = {product}/>}
          </Box>
        </Container>
        </>
  )
}

export default Search
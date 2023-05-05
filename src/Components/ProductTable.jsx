import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Skeleton,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Table from './Table';
import TableSkeleton from './TableSkeleton';
import AlertBar from './AlertBar';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  /*Alert and modal*/
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  /*Product Modal*/
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedIndex, setSelectedIndex] = useState();
  const [alertId, setAlertId] = useState(null);

  /*Edit Product Modal*/
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [productModal, setProductModal] = useState(false);

  /* Sorting and Loading */
  const [sort, setSort] = useState('none');
  const [loading, setLoading] = useState(false);

  /*New Product Creation*/
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
    rating: { rate: 0, count: 0 },
  });
  const { title, price, description, category } = newProduct;

  function handleChange(e) {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  }

  /*Modal Handlers*/
  const modalOpen = (product) => {
    setSelectedProduct(product);
    setEditPrice(product.price);
    setEditTitle(product.title);
    setModal(true);
  };
  const modalClose = () => {
    setSelectedProduct({});
    setEditPrice('');
    setEditTitle('');
    setModal(false);
  };

  const handleProductModal = () => {
    setProductModal(!productModal);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*Delete Product*/
  function handleDelete(id) {
    let newArray = [...products];
    newArray = newArray.filter((item) => {
      return item.id != id;
    });

    axios.delete(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProducts([...newArray]);
      setAlertId(0);
      handleClick();
    });
  }

  /*Get Products*/
  function getProducts() {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      setProducts([...products, ...res.data]);
    });
  }

  /*Edit Product*/
  function handleEditProduct() {
    axios
      .put(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
        title: editTitle,
        price: Number(editPrice),
        ...selectedProduct,
      })
      .then((res) => {
        const newArray = [...products];

        newArray[selectedIndex] = {
          ...newArray[selectedIndex],
          title: editTitle,
          price: editPrice,
        };
        setProducts(newArray);
        setModal(false);
        handleClick(true);
        setAlertId(1);
      });
  }

  /*Create Product*/
  function handleCreateProduct() {
    setLoading(true);
    axios.post('https://fakestoreapi.com/products').then((res) => {
      setProducts([...products, { ...newProduct, id: uuidv4() }]);
      handleProductModal();
      handleClick(true);
      setAlertId(2);
      setNewProduct({
        title: '',
        price: '',
        description: '',
        image: 'https://i.pravatar.cc',
        category: '',
        rating: { rate: 0, count: 0 },
      });
      setLoading(false);
    });
  }

  /*Sorting Product*/
  function handleSortChange(event) {
    setSort(event.target.value);
    const [selector, query] = event.target.value.split('-');

    axios
      .get(`https://fakestoreapi.com/products?sort=${query}`)
      .then((res) => setProducts(res.data));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* Alertbar */}
      <AlertBar open={open} handleClose={handleClose} alertId={alertId} />

      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          paddingX: '10px',
          marginY: '10px',
        }}
      >
        <Button
          variant='contained'
          sx={{ marginY: '15px' }}
          onClick={() => {
            // console.log('create product');
            handleProductModal();
          }}
        >
          Create New Product
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <InputLabel id='demo-select-small'>Sort</InputLabel>
          <Select
            labelId='demo-select-small'
            id='demo-select-small'
            value={sort}
            label='Sort'
            onChange={handleSortChange}
            size='small'
            sx={{ minWidth: '200px' }}
          >
            <MenuItem value={'none'} disabled>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'price-asc'}>Price-Asc</MenuItem>
            <MenuItem value={'price-desc'}>Price-Desc</MenuItem>
          </Select>
        </Box>
      </Box>

      {/*  Products Table */}
      {products.length == 0 ? (
        <TableSkeleton />
      ) : (
        <Table
          products={products}
          modalOpen={modalOpen}
          setSelectedIndex={setSelectedIndex}
          handleDelete={handleDelete}
        />
      )}

      {/*Edit Product Modal*/}
      <Modal
        open={modal}
        onClose={modalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            id='outlined-text'
            label='Product Name'
            type='text'
            value={editTitle}
            size='small'
            margin='normal'
            fullWidth
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                {selectedProduct.description?.substr(0, 50) + '...'}
              </Typography>
              <TextField
                id='outlined-number'
                label='Price'
                type='number'
                value={editPrice}
                size='small'
                margin='normal'
                onChange={(e) => {
                  setEditPrice(e.target.value);
                }}
              />
            </Box>
            <Box>
              {selectedProduct.image ? (
                <Box>
                  <img
                    src={selectedProduct.image}
                    height={150}
                    width={120}
                    loading='lazy'
                  />
                </Box>
              ) : (
                <Skeleton
                  variant='reactangular'
                  animation='wave'
                  height={150}
                  width={120}
                  sx={{ bgcolor: 'grey.900' }}
                />
              )}
            </Box>
          </Box>
          <Button
            variant='contained'
            onClick={() => {
              handleEditProduct();
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/*New Product Modal*/}
      <Modal
        open={productModal}
        onClose={handleProductModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            id='product-text'
            label='Product Name'
            type='text'
            value={title}
            name='title'
            size='small'
            margin='normal'
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            id='product-price'
            label='Product Price'
            type='number'
            value={price}
            name='price'
            size='small'
            margin='normal'
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            id='outlined-multiline-flexible'
            label='Description'
            multiline
            maxRows={4}
            fullWidth
            size='small'
            margin='normal'
            value={description}
            name='description'
            onChange={handleChange}
            required
          />
          <InputLabel id='demo-simple-select-label'>Category</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={category}
            label='Category'
            size='small'
            onChange={handleChange}
            name='category'
            sx={{ minWidth: 200 }}
            required
          >
            <MenuItem value={'electronics'}>electronics</MenuItem>
            <MenuItem value={'jewelery'}>jewelery</MenuItem>
            <MenuItem value={"men's clothing"}>men clothing</MenuItem>
            <MenuItem value={"women's clothing"}>women clothing</MenuItem>
          </Select>
          <br />
          {loading ? (
            <LoadingButton
              loading
              loadingIndicator='Adding New Product'
              variant='contained'
            >
              Adding New Product
            </LoadingButton>
          ) : (
            <Button
              variant='contained'
              sx={{ marginY: '15px' }}
              onClick={handleCreateProduct}
            >
              Add New Product
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProductTable;

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import React, { useEffect, useState }  from 'react';
import Form from '../components/Form';
import { Container } from '@mui/system';
import {  useDeletePostMutation, useGetPostQuery, useGetPostsQuery } from '../services/posts';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


const Card = styled.div`
height: 240px;
background: rgba( 255, 255, 255, 0.65 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 17.5px );
-webkit-backdrop-filter: blur( 17.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
transition: transform 0.3s;
:hover {
elevate: 0.1px;
transform: scale(1.01);
}
`
const ProductImg = styled.img`
width: 180px;
height: 100px;
`
const ProductTitle = styled.h3`
font-size: 1rem;
margin-bottom: 2px;
text-align: start;
margin: 0 0 0 10px;
`
const ProductCategory = styled.h4`
font-weight: 200;
text-align: start;
font-size: 0.8rem;
margin: 5px 0 2px 10px;
`
const ProductPrice = styled.h2`
text-align: start;
font-size: 1rem;
margin: 2px 0 5px 10px;
`
const ProductDescritpion = styled.p`
text-align: start;
font-size: 0.7rem;
margin: 0 0 0 10px;
`
const BtnContainer = styled.div`
display: flex;
margin: 10px 0 0 10px;
`
const DeleteBtn = styled.button`
outline: none;
border: none;
margin-right: 5px;
font-size: 0.7rem;
border-radius: 5px;
background-color: #FFA500;
color: #fff;
padding: 4px;
cursor: pointer;
`
const EditBtn = styled.button`
outline: none;
border: none;
font-size: 0.7rem;
border-radius: 5px;
background-color: #FFA500;
color: #fff;
padding: 4px;
cursor: pointer;
`

const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin-top: 20px;
`
const Header = styled.div`
height: 50px;
width: 100%;
background-color: #FFA500;
`
const Logo = styled.h2`
font-family: montsurrat;
color: #fff;
margin: 10px 0 0 25px;
cursor: pointer;
`

function HomePage(props: {currentId: any, setCurrentId: any}) {
   
    let currentId = props.currentId;
    let setCurrentId = props.setCurrentId;
   // const notify = () => toast(currentId ? "Updated Successfuly!": "Post Successfuly!");
   
 const { data, error, isSuccess } = useGetPostsQuery();
 //console.log(data);
 const [deletePost ] = useDeletePostMutation();


  return (
    <>
      <StyledBox>
    <Header>
      <Grid container>
       <Grid item lg={3} md={3} sm={3} xs={6}>
       <Logo>Xella Sales</Logo>
       </Grid>
      </Grid>
      </Header>
      <StyledContainer>
      <Grid container>
        <Grid item lg={4} md={4} sm={4} xs={12}>
         <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={12}>
        <Grid container spacing={2}>
        {data?.map((result: any) => (
        <Grid item lg={3} md={3} sm={4} xs={12}>
         <Card id={result.id} >
          <ProductImg src={result.image} alt='product image' />
          <ProductTitle>{result.title}</ProductTitle>
          <ProductCategory>{result.category}</ProductCategory>
          <ProductPrice>{result.price}</ProductPrice>
          <ProductDescritpion>{result.description}</ProductDescritpion>
          <BtnContainer>
          <DeleteBtn type='button' onClick={() => deletePost(result.id) }>Delete</DeleteBtn>
          <EditBtn onClick={() => setCurrentId(result.id)}>Edit</EditBtn>
         { /*<Link to={`/updatepost/${result.id}`}>
          
          </Link> */}
          </BtnContainer>
         </Card>
         </Grid>
           ))}
         </Grid>
         </Grid>
         </Grid>
      </StyledContainer>
    </StyledBox>
    </>
  )
}

export default HomePage

function useParams<T>(): { id: any; } {
    throw new Error('Function not implemented.');
}

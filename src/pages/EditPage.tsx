import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {  useGetPostQuery, useGetPostsQuery, useUpdatePostMutation } from '../services/posts';
import { useNavigate } from "react-router-dom";
import {  useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query/react'

const StyledBox = styled(Box)`
`
const FormContainer = styled.div`

`
const Forms = styled.form`

`
const Input = styled.input`

`
const UpdateBtn = styled.button`

`

function DetailsPage() {

  const [post, setPost] = useState({title: '', category: '', price: '', description: '', image: ''})
  
  const [updatePost] = useUpdatePostMutation()
  const {id} = useParams<{id: any }>();
  let navigate = useNavigate();
  
  
  const {data} = useGetPostQuery(id as any )
  console.log(data)

  useEffect(() => {
    if(data) {
      setPost({...data});
    }
  }, [id, data])


  const handleUpdate = async (e: any) => {
    e.preventDefault()
    await updatePost({...post});
        navigate("/");
         toast.success("Contact Updated Successfully");
   }
  
  
    return (
      
      <StyledBox id={id}>
      <FormContainer>
      <Grid container>
        <Grid item lg={4} md={4} sm={6} xs={12}>
       <Forms onSubmit={handleUpdate}>
       <TextField style={{marginBottom: 10}} id="outlined-basic" label="Title" variant="outlined" value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} />
       <TextField style={{marginBottom: 10}} id="outlined-basic" label="Category" variant="outlined" value={post.category} onChange={(e) => setPost({...post, category: e.target.value})} />
       <TextField style={{marginBottom: 10}} id="outlined-basic" label="Price" variant="outlined" value={post.price} onChange={(e) => setPost({...post, price: e.target.value})} />
       <TextField style={{marginBottom: 10}} id="outlined-basic" label="Description" variant="outlined" value={post.description} onChange={(e) => setPost({...post, description: e.target.value})} />
       <TextField style={{marginBottom: 10}} id="outlined-basic" label="image url" variant="outlined" type='url' value={post.image} onChange={(e) => setPost({...post, image: e.target.value})} />
       <UpdateBtn type='submit'>Update</UpdateBtn>
       </Forms>
       </Grid>
       </Grid>
      </FormContainer>
      </StyledBox>
      
  )
}

export default DetailsPage
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useAddPostMutation,  useGetPostQuery, useUpdatePostMutation } from '../services/posts';

import {  useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store, useAppSelector } from '../features/store';

const StyledBox = styled(Box)`
`
const FormContainer = styled.div`

`
const Forms = styled.form`

`
const Input = styled.input`

`
const SubmitBtn = styled.button`
padding: 10px 15px;
border: none;
outline: none;
background-color: #FFA500;
border-radius: 5px;
color: #fff;
cursor: pointer;
font-weight: 600;
`
const initialState = {title: '', category: '', price: '', description: '', image: ''};
function Form(props: {currentId: any, setCurrentId: any}) {
    const [formValue, setFormValue] = useState(initialState);
    const {title, category, price, description, image} = formValue;
    let currentId = props.currentId;
    let setCurrentId = props.setCurrentId;
    const clear = () => {
        setFormValue({title: '',  category: '', price: '', description: '', image: ''})
        }
       const { id } = useParams<{ id: any }>()
     
    const [addPost] = useAddPostMutation()
    const [updatePost] = useUpdatePostMutation()
    const { data } = useGetPostQuery(currentId)
    const notify = () => toast(currentId ? "Updated Successfuly!": "Post Successfuly!");
   

    
    useEffect(() => {
        if(data) {
       setFormValue({...data})
        } 
      }, [data])
    
   console.log(data)
    
   
    const handleSubmit = async (e: any) => {
        e.preventDefault()
       try {
            if(currentId) {
                await updatePost({...formValue})
               
            } else {
                await addPost({...formValue}).unwrap()
              
            }
        } catch {
            toast("We couldn't save your changes, try again!" )}
            clear();
            notify();
           }
       

    return (
    <StyledBox>
    <FormContainer key={currentId}>
     <Forms onSubmit={handleSubmit} encType="multipart/form-data" method="post">
     <TextField style={{marginBottom: 10, width: '92%'}}  id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setFormValue({...formValue, title: e.target.value})} />
     <TextField style={{marginBottom: 10, width: '92%'}} id="outlined-basic" label="Category" variant="outlined" value={category} onChange={(e) => setFormValue({...formValue, category: e.target.value})} />
     <TextField style={{marginBottom: 10, width: '92%'}}  id="outlined-basic" label="Price" variant="outlined" value={price} onChange={(e) => setFormValue({...formValue, price: e.target.value})} />
     <TextField style={{marginBottom: 10, width: '92%'}}  id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e) => setFormValue({...formValue, description: e.target.value})} />
     <TextField style={{marginBottom: 10, width: '92%'}}  id="outlined-basic" label="image url" variant="outlined" type='url' value={image} onChange={(e) => setFormValue({...formValue, image: e.target.value})} />
     <SubmitBtn type='submit'>{currentId ? 'Update': 'Submit'}</SubmitBtn>
     <ToastContainer />
     </Forms>
    </FormContainer>
    </StyledBox>
  )
}

export default Form



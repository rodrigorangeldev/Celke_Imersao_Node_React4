import React, { useState } from 'react';

import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   Container,
   Jumbotron,
   Form,
   FormGroup,
   Input,
   Label,
   Button,
   Alert
} from 'reactstrap';

function HomePage() {

   const [isOpen, setIsOpen] = useState(false);
   const toggle = () => setIsOpen(!isOpen);
   const [orcamento, setOrcamento] = useState({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      msg: ''
   })
   const [response, setResponse] = useState({
      formSave: false,
      type: '',
      message: ''
   })

   const onChangeInput = e => setOrcamento({...orcamento, [e.target.name]: e.target.value})

   const handleSubmit = async e  => {
      e.preventDefault()

      setResponse({
         formSave: true
      })

      try {

         const res = await fetch('http://localhost:8000/orcamento',{
            method: 'POST',
            body: JSON.stringify(orcamento),
            headers: {'Content-Type': 'application/json'}
         })

         const responseEnv = await res.json()

         if(responseEnv.error){
            setResponse({
               type: 'error',
               formSave: false,
               message: responseEnv.message
            })
         }
         else{
            setResponse({
               type: 'success',
               formSave: false,
               message: responseEnv.message
            })            
         }
         
      } catch (error) {
         setResponse({
            type: 'error',
            formSave: false,
            message: 'Ocorreu um erro ao tentar enviar os dados: ' + error
         }) 
      }   

   }

   return (
      <div>
         <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Celke</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className="mr-auto" navbar>
                  <NavItem>
                     <NavLink href="/">Components</NavLink>
                  </NavItem>
               </Nav>
            </Collapse>
         </Navbar>

         <Container>

            <Jumbotron>
               <h1 className="display-3">Hello, world!</h1>
               <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
               <hr className="my-2" />
               <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>

               <Form onSubmit={handleSubmit}>
                  <FormGroup>
                     <Label for="name">Email</Label>
                     <Input type="text" name="name" id="name" placeholder="Your name" onChange={onChangeInput} />
                  </FormGroup>

                  <FormGroup>
                     <Label for="email">Email</Label>
                     <Input type="email" name="email" id="email" placeholder="email" onChange={onChangeInput}  />
                  </FormGroup>

                  <FormGroup>
                     <Label for="phone">Telefone</Label>
                     <Input type="tel" name="phone" maxLength="11" id="phone" placeholder="(99) 999999999" pattern="[0-9]{2}[0-9]{5}[0-9]{4}" 
                     onChange={onChangeInput} 
                     />
                  </FormGroup>

                  <FormGroup>
                     <Label for="whatsapp">WhatsApp</Label>
                     <Input type="tel" name="whatsapp" maxLength="11" id="whatsapp" placeholder="(99) 999999999"  pattern="[0-9]{2}[0-9]{5}[0-9]{4}" onChange={onChangeInput}  />
                  </FormGroup>

                  <FormGroup>
                     <Label for="msg">Email</Label>
                     <Input type="textarea" name="msg" id="msg" placeholder="Your message" onChange={onChangeInput}  />
                  </FormGroup>

                  {
                     response.formSave ? <p>Enviando, aguarde...</p>
                     : <Button type="submit" color="info">Enviar</Button>
                  }
                  

               </Form>

                  <br />
               {
                  response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ''
               }
               {
                  response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ''
               }
                  
                  
           


            </Jumbotron>

         </Container>

      </div>

   )

}

export default HomePage
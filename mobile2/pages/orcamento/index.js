import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import api from '../../service/api'

export default function () {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [whatsapp, setWhatsapp] = useState('')
   const [msg, setMsg] = useState('')
   const [loading, setLoading] = useState(false)

   const validate = () => {

      if(!name){
         Alert.alert("", "O campo Nome é obrigatório.")
         return false
      }

      if(!email){
         Alert.alert("", "O campo Email é obrigatório.")
         return false
      }

      if(!phone){
         Alert.alert("", "O campo Telefone é obrigatório.")
         return false
      }

      if(!whatsapp){
         Alert.alert("", "O campo WhatsApp é obrigatório.")
         return false
      }

      if(!msg){
         Alert.alert("", "O campo Mensagem é obrigatório.")
         return false
      }

      return true

   }

   const handleSave =  async () => {

      if(!validate()) return

      setLoading(true)

      await api.post('/orcamento',{
         name, 
         email,
         phone,
         whatsapp,
         msg
      }) 
      .then(response => {
         Alert.alert("", response.data.message)
         setLoading(false)
      })
      .catch(err => {
         if(err.response){
            Alert.alert("", response.data.message)
         }else{
            Alert.alert("", "Houve um erro ao tentar enviar os dados: " + err)
         }
         setLoading(false)
      })

   }

   return (
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.container}>

         <View style={[styles.formGroup, styles.forMarginTop]}>
            <Text>Nome completo</Text>
            <TextInput 
               style={styles.input} 
               maxLength={100} 
               placeholder="Nome completo" 
               onChangeText={text => setName(text)} 
               value={name}
               />
         </View>

         <View style={styles.formGroup}>
            <Text>E-Mail</Text>
            <TextInput 
               style={styles.input} 
               placeholder="E-mail" 
               maxLength={50} 
               onChangeText={text => setEmail(text)}  
               value={email}
               />
         </View>

         <View style={styles.formGroup}>
            <Text>Telefone</Text>
            <TextInput 
               style={styles.input} 
               placeholder="(XX) XXXXX-XXXX" 
               maxLength={20} 
               onChangeText={text => setPhone(text)}  
               value={phone}
               />
         </View>

         <View style={styles.formGroup}>
            <Text>WhatsApp</Text>
            <TextInput 
               style={styles.input} 
               placeholder="(XX) XXXXX-XXXX" 
               maxLength={20} 
               onChangeText={text => setWhatsapp(text)}  
               value={whatsapp}
               />
         </View>

         <View style={styles.formGroup}>
            <Text>Mensagem</Text>
            <TextInput 
               style={[styles.input, {height: 60}]} 
               placeholder="Mensagem" 
               onChangeText={text => setMsg(text)}  
               value={msg}
               />
         </View>

         <View style={styles.btnContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.btn} disabled={loading}>
              { !loading && <Text style={styles.btnText}>Enviar</Text>}
               {
                 loading &&
                 <ActivityIndicator size="small" color="#0000ff" style={{ marginLeft: 10}}>
                  </ActivityIndicator>
               }
               
            </TouchableOpacity>
         </View>

      </View>
      </ScrollView>

   )
}

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 10
   },
   title:{
      marginVertical: 20,
      fontSize: 15
   },
   btn:{
      backgroundColor: '#FFF5F3',
      borderRadius: 10,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      flexDirection: 'row'
   },
   btnText:{
      fontSize: 17
   },
   forMarginTop:{
      marginTop: 20
   },
   btnContainer:{

   },
   label: {

   },
   formGroup: {
      marginBottom: 15
   },
   input:{
      height: 40,
      borderWidth: 0.5,
      borderColor: '#006064',
      backgroundColor: '#FFF5F3',
      borderRadius: 10,
      paddingHorizontal: 10,
      elevation: 2
   },
   indicatorContainer:{
      alignItems: 'center',
      justifyContent: 'center'
      
   }
})
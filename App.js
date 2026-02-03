import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import axios from 'axios';

const API_KEY = process.env.GROQ_API_KEY;
export default function App() {
  const [ingredientes, setIngredientes] = useState('');
  const [receita, setReceita] = useState('');


  const api = axios.create({
    baseURL: 'https://api.groq.com/openai/v1/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  })


  async function gerarReceita() {  git push -u origin master

    const resposta = await api.post('chat/completions',{
      model : 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `Você é um chef de cozinha experiente que cria receitas deliciosas com base nos ingredientes fornecidos, responda em portugues do Brasil.
          
          ⏱️ Tempo de preparo: [Tempo de preparo]
🍽️ Porções: [Número de porções]


🛒 Ingredientes

🧂 [Ingrediente 1]

🥕 [Ingrediente 2]

🥩 [Ingrediente 3]


👩‍🍳 Modo de preparo

🔥 [Passo 1]

🥄 [Passo 2]

⏳ [Passo 3]

💡 Dica do Chef


✨ [Dica culinária opcional]
         `,
        },
        {
          role: 'user',
          content: `Crie uma receita com base nos seguintes ingredientes: ${ingredientes}`,
        }
      ],
      temperature: 1,
      max_tokens: 1024,
    
    })


    setReceita(resposta.data.choices[0].message.content);

  }





  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Image source={{uri: 'https://img.icons8.com/parakeet-line/48/cook-male.png'}} style={styles.emojiImage} />
        <Text style={styles.title}>Chef IA Kennedy</Text>
        <Text style={styles.subTitle}>Digite os ingredientes</Text>


        {/* Input*/}

        <TextInput
          style={styles.input}
          placeholder="Digite os ingredientes aqui..."
          multiline
          placeholderTextColor="#888"
          value={ingredientes}
          onChangeText={setIngredientes}
        
        /> 

         {/* Button*/}

        <TouchableOpacity style={styles.button}
        onPress={gerarReceita}
        >
          <Text style={styles.buttonText}>Gerar Receita</Text>
        </TouchableOpacity>

        {/*Receita*/}
        {receita ? (
          <ScrollView style={{ marginTop: 20 }}>
            <Text style={{ color: '#fff' }}>{receita}</Text>
          </ScrollView>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>🍳</Text>
            <Text style={styles.placeholderText}>Receita Gerada Aparecera Aqui</Text>
          </View>
        )}


  

       

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Dev WK</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://wekdev.com')}>
          <Text style={styles.footerLink}>wekdev.com</Text>
        </TouchableOpacity>
      </View>
    </View>
    

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },

  emojiImage: {
    width: 48,
    height: 48,
    marginBottom: 10,
    tintColor: '#fff',
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

 subTitle: {
  fontSize: 14,
  color: 'rgba(255,255,255,0.6)',
  marginTop: 8,
  lineHeight: 20,
  letterSpacing: 0.3,
  fontWeight: '400',
},


 input: {
  backgroundColor: '#2d2d44',
  borderRadius: 14,
  paddingVertical: 14,
  paddingHorizontal: 16,
  fontSize: 18,
  color: '#fff',
  minHeight: 120,
  textAlignVertical: 'top',
  marginBottom: 15,
  marginTop: 10,
  width: '100%',

  // borda sutil
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.08)',

  // sombra (Android)
  elevation: 2,

  // sombra (iOS)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
},



  button: {
  backgroundColor: '#8e44ad',
  paddingVertical: 14,
  paddingHorizontal: 24,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 15,
  borderWidth: 2,
  borderColor: '#fff',

  // sombra (Android)
  elevation: 8,

  // sombra (iOS)
  shadowColor: '#8e44ad',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
},



  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  placeholder: {
    alignItems: 'center',
    marginTop: 20,
  },

  placeholderEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  placeholderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  footerText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },

  footerLink: {
    color: '#e17055',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
 
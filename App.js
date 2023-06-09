import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Componente para exibir os dados do doador e permite inserir os dados
const DadosDoador = ({ nomeDoador, tipoSanguineo, contatoDoador, onChangeNome, onChangeTipoSanguineo, onChangeContato }) => {
  return (
    <View>
      <Text style={{ fontSize: 20, marginTop: 20 }}>Dados do Doador:</Text>
      <View>
        <Text>Nome:</Text>
        <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          value={nomeDoador}
          onChangeText={onChangeNome}
        />
      </View>
      <View>
        <Text>Tipo Sanguíneo:</Text>
        <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          value={tipoSanguineo}
          onChangeText={onChangeTipoSanguineo}
        />
      </View>
      <View>
        <Text>Contato:</Text>
        <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          value={contatoDoador}
          onChangeText={onChangeContato}
        />
      </View>
    </View>
  );
};

// Componente para exibir os dados do receptore permite inserir dados
const DadosReceptor = ({ nomeReceptor, cidade, hospital, onChangeNomeReceptor, onChangeCidade, onChangeHospital }) => {
  return (
    <View>
      <Text style={{ fontSize: 20, marginTop: 20 }}>Dados do Receptor:</Text>
      <View>
        <Text>Nome:</Text>
        <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          value={nomeReceptor}
          onChangeText={onChangeNomeReceptor}
        />
      </View>
      <View>
        <Text>Cidade:</Text>
        <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          value={cidade}
          onChangeText={onChangeCidade}
        />
      </View>
      <View>
        <Text>Hospital:</Text>
        <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          value={hospital}
          onChangeText={onChangeHospital}
        />
      </View>
    </View>
  );
};

// Componente da tela principal do aplicativo
const MainScreen = () => {
  const navigation = useNavigation();

  const [nomeDoador, setNomeDoador] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [contatoDoador, setContatoDoador] = useState('');
  const [nomeReceptor, setNomeReceptor] = useState('');
  const [cidade, setCidade] = useState('');
  const [hospital, setHospital] = useState('');
  const [pedidos, setPedidos] = useState([]);

  const handleDoar = () => {
    const novoPedido = {
      nomeReceptor,
      cidade,
      hospital,
      tipoSanguineo,
    };
    setPedidos([...pedidos, novoPedido]);
    setNomeReceptor('');
    setCidade('');
    setHospital('');
    setTipoSanguineo('');
  };

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 30, marginTop: 50, textDecorationLine: 'underline' }}>DOE SANGUE</Text>
        <DadosDoador
          nomeDoador={nomeDoador}
          tipoSanguineo={tipoSanguineo}
          contatoDoador={contatoDoador}
          onChangeNome={setNomeDoador}
          onChangeTipoSanguineo={setTipoSanguineo}
          onChangeContato={setContatoDoador}
        />
        <DadosReceptor
          nomeReceptor={nomeReceptor}
          cidade={cidade}
          hospital={hospital}
          onChangeNomeReceptor={setNomeReceptor}
          onChangeCidade={setCidade}
          onChangeHospital={setHospital}
        />
        <Button title="Doar" onPress={handleDoar} />
        <Text style={{ fontSize: 20, marginTop: 20 }}>Pedidos:</Text>
        <FlatList
          data={pedidos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <DadosReceptor nomeReceptor={item.nomeReceptor} cidade={item.cidade} hospital={item.hospital} />
              <DadosDoador
                nomeDoador={nomeDoador}
                tipoSanguineo={item.tipoSanguineo}
                contatoDoador={contatoDoador}
                onChangeNome={() => {}}
                onChangeTipoSanguineo={() => {}}
                onChangeContato={() => {}}
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Second')}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10, paddingTop:60}}>
          Ir para a Segunda Tela
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Componente da segunda tela do aplicativo , navegação
const SecondScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18}} >obrigado a todos os envolvidos nessa campanha, se possivel divulguem essa imagem abaixo para as pessoas verem o quão importante é a doação</Text>
        <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10, paddingTop: 80 }}>
          Voltar para a Primeira Tela
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Image
          source={require('./img/campanha_de_sangue.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>  
    </View>
  );
};


//cria um navegador de pilha (define as rotas para a primeira e segunda tela)
const Stack = createNativeStackNavigator();

// Screen objetivo de rota dentro dos componentes
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React, { useState, useEffect } from 'react'; // Sempre começando com use: useState ou useEfects
                                         // Podemos criar nossos hooks
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  // date?:Date (? elemento opicional)
}

export function Home() {
  //     Estado    função que atualiza o estado
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  // oldState => [React Native, TypeScript]
  // [[React Native, TypeScript], JavaScript]
  // Temos que utilizar o spredOperator, para colocar os elementos
  //                                      tudo em um único vetor
  // [...oldState, TypeScript]

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills(oldState => [...oldState, data]);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12){
      setGreeting("Good Morning");
    }else if(currentHour >= 12 && currentHour < 18){
      setGreeting("Good Afternoon");
    }else{
      setGreeting("Good Night");
    }
  }, []);

  return(

    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Rodrigo</Text>

      <Text style={styles.greeting}>
        { greeting }
      </Text>   

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill} // Fica observado toda mudança
      />
      
      <Button 
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>
      <FlatList 
        //showsVerticalScrollIndicator={false}
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard skill={item.name}/>
        )}
      />

    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title:{
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greeting:{
    color: '#FFF',
  }
});
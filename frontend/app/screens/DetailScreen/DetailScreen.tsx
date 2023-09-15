import React from 'react';
import { View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Text } from 'react-native-paper';

function DetailScreen() {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <View style={styles.header} >
        <Icon name="chevron-left" size={50} color="#ffffff" />
        <View style={styles.header_button_group}>
            <Button style={styles.button}  mode="outlined" onPress={() => console.log('Pressed')}>
              정산 현황
            </Button>
            <Button style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
              분석
            </Button>
        </View>
      </View>

      
      <View style={{flex: 4, backgroundColor: 'darkorange'}} >
        <View style={{ backgroundColor: 'blue', flexDirection: 'row', alignContent:'flex-end', flexWrap:'wrap'}} >
          <Text style={styles.title}>부산 호캉스</Text>
          <Text style={styles.type}>국내</Text>
        </View>
        <View style={{ backgroundColor: 'blue', flexDirection: 'row', alignContent:'flex-end', flexWrap:'wrap'}} >
          <Text style={styles.period}>2023.09.01~2023.09.03</Text>
        </View>
        <View style={{ backgroundColor: 'white',flexDirection:'row', flexWrap:'wrap', alignItems:'center'}} >
          <Icon name="face" size={30} color="green" />
          <Icon name="face" size={30} color="green" />
          <Button icon="plus" style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
            일행 추가
          </Button>
        </View>
        <View style={{ backgroundColor: 'green',flexDirection:'column', alignItems:'center', padding:10}}>
          <View style={{alignItems:'center', backgroundColor:'red'}}>
            <Text>9.1금까지</Text>
          </View>
          <View style={{alignItems:'center', backgroundColor:'skyblue'}}>
            <Text style={styles.balance}>500,00원</Text>
          </View>
        </View>
        <View style={styles.body_button_group}>
          <Button icon="plus" style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
            내역 추가
          </Button>
          <Button icon="plus" style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
            정산하기
          </Button>
        </View>
      </View>
      <View style={{flex: 7, backgroundColor: 'pink'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  body_button_group:{
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balance:{
    fontSize:50,
    justifyContent:'center'
  },
  period:{
    fontSize:10,
  },
  title:{
    fontSize: 30,
  },
  type:{
    fontSize:10,
    alignSelf:'flex-end'
  },
  button:{
    padding:0,
    borderRadius:20,
    flexWrap:"wrap"
  },
  header_button_group:{
    flexDirection: 'row',
  },
  header:{
    flex: 1, 
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
})
export default DetailScreen;

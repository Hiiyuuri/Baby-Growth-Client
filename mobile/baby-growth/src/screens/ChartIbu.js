
import { ScrollView ,Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import {
  BarChart
} from "react-native-chart-kit-with-pressable-bar-graph";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/config';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function ChartIbu({navigation}) {
  const screenWidth = Dimensions.get("window").width;
  const [pregnancy, setPregnancy] = useState({})
  const [selectedData,setSelectedData]=useState([]);
  const [setArticle,setDisplayedArticle]=useState([]);
  const [selectedBabyData,setSelectedBabyData]=useState([]);
  const [dateData,setDateData]=useState([]);
  const [dateBabyData,setDateBabyData]=useState([]);
  const [modalShown,setModalShown]=useState(false);
  let needtoRerender=false;

  useFocusEffect(
    React.useCallback(() => {
      console.log("Use effect called")
    const fn = async () => {
      const access_token = await AsyncStorage.getItem(`access_token`);
      console.log("Token Adalah"+access_token)
      setPregnancy([]);
      setDateData([]);
      setDateBabyData([]);
      setSelectedBabyData([]);
      setSelectedData([]);

      if (access_token) {
        try {
          const result = await axios.get(url+"/pregnancy",{headers:{access_token:access_token}});
          if (result) {
            console.log(result.data);
            setPregnancy(result.data);
          } else {
            console.log("Error found")
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        navigation.navigate('Logout');
      }

    }

    fn();
    }, [needtoRerender])
  );
  // useEffect(() => {
  //   console.log("Use effect called")
  //   const fn = async () => {
  //     const valueNIK = await AsyncStorage.getItem(`nik`);
  //     console.log("NIK Adalah"+valueNIK)
  //     if (valueNIK) {
  //       try {
  //         const result = await axios.post(url+"/pregnancy",{nik:valueNIK});
  //         if (result) {
  //           console.log(result.data);
  //           setPregnancy(result.data);
  //         } else {
  //           console.log("Error found")
  //         }
  //       }
  //       catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     else {
  //       navigation.navigate('Logout');
  //     }

  //   }

  //   fn();

  // }, [needtoRerender])
  function displayModalMother(indexMonth){
    console.log(indexMonth);
    console.log(dateData[indexMonth]);
    const fn = async () => {
        try {
          const result = await axios.get(url+"/categoryMonth/"+indexMonth);
          if (result) {
            console.log(result.data);
            if(result.data.Articles.length!=0){
              setDisplayedArticle(result.data.Articles[0]);
              setModalShown(true);
            }
            
          } else {
            console.log("Error found")
          }
        }
        catch (error) {
          console.log(error);
        }
      }
    

    fn();
    
  }

  function displayModalBaby(indexMonth){
    
  }

  const displayChart=(event=>{
      let tempStr=event.PregnancyDatum.beratAwal+","+event.PregnancyDatum.beratBulanan;
      console.log(tempStr +"   bagian ibu");
      let arrRes=tempStr.split(",");
      console.log(arrRes);    
    let arrRes2=[];
    if(event.BabyDatum){
      let tempStr2=event.BabyDatum.beratAwal+","+event.BabyDatum.beratBulanan;
      console.log(tempStr2 +"   bagian anak");
      arrRes2=tempStr2.split(",");
      
    }
    setDates(event,arrRes,arrRes2);
    
  })

  function setDates(event,arrRes,arrRes2){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let tempDate=new Date(event.PregnancyDatum.tanggalDicatat).getMonth();
    console.log(arrRes.length+" ibu");
    let result=[]
    
    for(let i=0;i<arrRes.length;i++){
      
      result.push(month[((tempDate+i)%12)]);
    }
    console.log(result);
  setDateData(result);
  if(arrRes2.length!=0){
    let tempDate2=new Date(event.BabyDatum.tanggalDicatat).getMonth();
    console.log(arrRes2.length+" anak");
    let result2=[]
    
    for(let i=0;i<arrRes2.length;i++){
      result2.push(month[((tempDate2+i)%12)]);
    }
    setDateBabyData(result2);
    
    setSelectedBabyData(arrRes2)
    console.log(result2);
  }
  setSelectedData(arrRes);
  }
    
  return (
    <ScrollView>
      <View style={styles.container}> 
      
    <Text>History Kehamilan Ibu</Text>
    <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          visible = {modalShown}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          {/*All views of Modal*/}  
              <View style = {styles.modal}>
              <Card>
                <Card.Content>
                <Card.Cover source={{ uri: setArticle.imageUrl }} />
                    <Paragraph>{setArticle.text}</Paragraph>
                </Card.Content>
                
            </Card> 
              <Button title="Kembali ke chart" onPress = {() => {  
                  setModalShown(false)}}/>  
          </View>  
        </Modal>  
    {/* */}
{ pregnancy.length!=0? <SelectDropdown
	data={pregnancy}
	onSelect={(selectedItem, index) => {
    console.log(selectedItem.name, index)
    displayChart(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.name
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.name
	}}
/>  : <Text>No Pregnancy Data Yet</Text>
}
    {/* { pregnancy.length!=0? <FlatList
            horizontal={true}
            data={pregnancy}
            renderItem={({item})=><Button onPress={()=>displayChart(item)} title={item.name}></Button>}
            keyExtractor={(item)=>item.id}
            
        ></FlatList> : <Text>No Pregnancy Data Yet</Text>
          } */}
    {selectedData.length!=0?<View><Text>History Berat Badan Ibu</Text><BarChart
      data={{
        labels: dateData,
        datasets: [
          {
            data: selectedData
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel=""
      yAxisSuffix="kg"
      yAxisInterval={0.5} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#ff0fff",
        backgroundGradientFrom: "#eeeeee",
        backgroundGradientTo: "#eeeeee",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(15, 15, 15, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(15, 15, 15, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    /></View>: <Text>Silahkan pilih periode kehamilan yang ingin dilihat</Text>}
    {selectedBabyData.length!=0?<View><Text>History Berat Bayi</Text><BarChart onDataPointClick={(data)=>{displayModalMother(data.index)}} 
      data={{
        labels: dateBabyData,
        datasets: [
          {
            data: selectedBabyData
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel=""
      yAxisSuffix="kg"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#eeeeee",
        backgroundGradientTo: "#eeeeee",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(15, 15, 15, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    /></View>: <Text></Text>}
    
    </View>
  </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    flex: 1
  },
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
     
     },
     tinyLogo: {
      width: 50,
      height: 50,
    }  
});

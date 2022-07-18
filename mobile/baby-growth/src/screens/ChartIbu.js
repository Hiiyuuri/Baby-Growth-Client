
import { ScrollView ,Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
// import {LineChart} from 'react-native-charts-wrapper';
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/config';

export default function ChartIbu({navigation}) {
  const screenWidth = Dimensions.get("window").width;
  const [pregnancy, setPregnancy] = useState({})
  const [selectedData,setSelectedData]=useState([]);
  const [selectedBabyData,setSelectedBabyData]=useState([]);
  const [dateData,setDateData]=useState([]);
  const [dateBabyData,setDateBabyData]=useState([]);
  const needtoRerender=false;
  useFocusEffect(
    React.useCallback(() => {
      console.log("Use effect called")
    const fn = async () => {
      const valueNIK = await AsyncStorage.getItem(`nik`);
      console.log("NIK Adalah"+valueNIK)
      if (valueNIK) {
        try {
          const result = await axios.post(url+"/pregnancy",{nik:valueNIK});
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
    <ScrollView >
    <Text>History Berat Kehamilan Ibu</Text>
    { pregnancy.length!=0? <FlatList
            horizontal={true}
            data={pregnancy}
            renderItem={({item})=><Button onPress={()=>displayChart(item)} title={item.name}></Button>}
            keyExtractor={(item)=>item.id}
            
        ></FlatList> : <Text>Loading</Text>
          }
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
      yAxisInterval={1} // optional, defaults to 1
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
    {selectedBabyData.length!=0?<View><Text>History Berat Bayi</Text><BarChart
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
        backgroundColor: "#ff00f0",
        backgroundGradientFrom: "#ffcffb",
        backgroundGradientTo: "#fff0f0",
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
  </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

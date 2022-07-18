
import { Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/config';

export default function ChartIbu() {
  const screenWidth = Dimensions.get("window").width;
  const [pregnancy, setPregnancy] = useState({})
  const [selectedData,setSelectedData]=useState([]);
  useEffect(() => {
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
        navigation.navigate('Login');
      }

    }

    fn();

  }, [])

  const displayChart=(event=>{
      let tempStr=event.PregnancyDatum.beratBulanan;
      let arrRes=tempStr.split(",");
    setSelectedData(arrRes);
  })
  return (
    <View>
    <Text>History Berat Badan Ibu</Text>
    { pregnancy.length!=0? <FlatList
            horizontal={true}
            data={pregnancy}
            renderItem={({item})=><Button onPress={()=>displayChart(item)} title={item.name}></Button>}
            keyExtractor={(item)=>item.id}
            
        ></FlatList> : <Text>Loading</Text>
          }
    {selectedData.length!=0? <BarChart
      data={{
        labels: ["January", "February", "March", "April", "May", "June"],
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
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#000000",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
    />: <Text>Silahkan pilih periode kehamilan yang ingin dilihat</Text>}
    
  </View>
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

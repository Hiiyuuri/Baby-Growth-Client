
import { ScrollView, Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
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
import { useIsFocused } from '@react-navigation/native';
export default function ChartIbu({ navigation }) {
  const [pregnancy, setPregnancy] = useState({})
  const [selectedData, setSelectedData] = useState([]);
  const [setArticle, setDisplayedArticle] = useState([]);
  const [selectedBabyData, setSelectedBabyData] = useState([]);
  const [selectedBabyDataOpacityColor, setSelectedBabyDataOpacityColor] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [dateBabyData, setDateBabyData] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [beratTooltip, setBeratTooltip] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    const fn = async () => {
      const access_token = await AsyncStorage.getItem(`access_token`);
      if (access_token) {
        if (!isFocused) {
          setPregnancy([]);
          setDateData([]);
          setDateBabyData([]);
          setSelectedBabyData([]);
          setSelectedData([]);
        } else {
          try {
            const result = await axios.get(url + "/pregnancy", { headers: { access_token: access_token } });
            if (result) {
              setPregnancy(result.data);
            } else {
            }
          }
          catch (error) {
          }
        }
      }
      else {
        navigation.navigate('Logout');
      }

    }

    fn();

  }, [isFocused])
  function displayModalMother(indexMonth) {
    const fn = async () => {
      try {
        const result = await axios.get(url + "/categoryMonth/" + (indexMonth));
        if (result) {
          if (result.data.Articles.length != 0) {
            setDisplayedArticle(result.data.Articles[0]);
          } else {
            setDisplayedArticle("");
          }

        } else {
          setDisplayedArticle("");
        }
        if (indexMonth == 0) {
          setBeratTooltip("Bayi Anda lahir")
        } else {
          let tempBerat = selectedBabyData[indexMonth] - selectedBabyData[indexMonth - 1];
          tempBerat = tempBerat.toFixed(2);
          if (tempBerat < 0) {
            setBeratTooltip("Berat badan bayi Anda berkurang " + tempBerat + " kg pada bulan ke-" + indexMonth)
          } else {
            setBeratTooltip("Berat badan bayi Anda telah bertambah " + tempBerat + " kg pada bulan ke-" + indexMonth)
          }
        }
        setModalShown(true);
      }
      catch (error) {
      }
    }


    fn();

  }

  function weightCalculator(month, dataMonth, dataPrev) {
    let lastWeight = (dataMonth - dataPrev) * 1000;
    let result = "";
    if (month === 1 || month === 2) {
      if (lastWeight < 750) {
        result = "kurang";
      } else if (lastWeight > 850) {
        result = "berlebih";
      } else {
        result = "cukup";
      }
    } else if (month === 3) {
      if (lastWeight < 550) {
        result = "kurang";
      } else if (lastWeight > 650) {
        result = "berlebih";
      } else {
        result = "cukup";
      }
    } else if (month === 4) {
      if (lastWeight < 450) {
        result = "kurang";
      } else if (lastWeight > 550) {
        result = "berlebih";
      } else {
        result = "cukup";
      }
    } else if (month === 5) {
      if (lastWeight < 350) {
        result = "kurang";
      } else if (lastWeight > 450) {
        result = "berlebih";
      } else {
        result = "cukup";
      }
    } else if (month >= 6 && month <= 16) {
      if (lastWeight < 250) {
        result = "kurang";
      } else if (lastWeight > 350) {
        result = "berlebih";
      } else {
        result = "cukup";
      }
    } else if (month >= 17 && month <= 23) {
      if (lastWeight < 150) {
        result = "kurang";
      } else if (lastWeight > 250) {
        result = "berlebih";
      } else {
        result = "cukup";
      }
    }
    return result;
  }

  const displayChart = (event => {
    let tempStr = event.PregnancyDatum.beratAwal + "," + event.PregnancyDatum.beratBulanan;
    let arrRes = tempStr.split(",");
    let arrRes2 = [];
    if (event.BabyDatum) {
      let tempStr2 = event.BabyDatum.beratAwal + "," + event.BabyDatum.beratBulanan;
      arrRes2 = tempStr2.split(",");
    }
    setDates(event, arrRes, arrRes2);

  })

  function setDates(event, arrRes, arrRes2) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let tempDate = new Date(event.PregnancyDatum.tanggalDicatat).getMonth();
    let result = []
    for (let i = 0; i < arrRes.length; i++) {
      result.push(month[((tempDate + i) % 12)]);
    }
    setDateData(result);
    if (arrRes2.length != 0) {
      let tempDate2 = new Date(event.BabyDatum.tanggalDicatat).getMonth();
      let temp = [];
      for (let i = 0; i < arrRes2.length; i++) {
        if (i == 0) {
          temp.push((opacity = 1) => '#1fffee')
        }
        else {
          let type = weightCalculator(i, arrRes2[i], arrRes2[i - 1]);
          if (type == "kurang") {
            temp.push((opacity = 1) => '#FFA9FF')
          } else if (type == "cukup") {
            temp.push((opacity = 1) => '#78A9FF')
          } else {
            temp.push((opacity = 1) => '#8E95FF')
          }
        }
      }
      setSelectedBabyDataOpacityColor(temp);
      let result2 = []
      for (let i = 0; i < arrRes2.length; i++) {
        result2.push(month[((tempDate2 + i) % 12)]);
      }
      setDateBabyData(result2);
      setSelectedBabyData(arrRes2)
    }
    setSelectedData(arrRes);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>History Kehamilan Ibu</Text>
          <Modal
            animationType={"fade"}
            transparent={false}
            backdropOpacity={0.5}
            hasBackdrop={true}
            visible={modalShown}
            onRequestClose={() => { setModalShown(false) }}>
            <View style={setArticle != "" ? styles.modal1 : styles.modal2}>
              <Card>
                <Card.Content>
                  <Text style={{ fontSize: 20, color: '#008080', textAlign: 'center' }}>{beratTooltip}</Text>

                  {setArticle != "" ? <View>
                    <Card.Cover source={{ uri: setArticle.imageUrl }} />
                    <Text style={{ fontSize: 16, color: '#008080' }}>Artikel Terkait:</Text>
                    <View style={{ height: 300 }}>
                      <ScrollView>
                        <Text>
                          {setArticle.text}
                        </Text>
                      </ScrollView>
                    </View>
                  </View> : <Text></Text>
                  }

                </Card.Content>

              </Card>
              <Button title="Kembali ke chart" onPress={() => {
                setModalShown(false)
              }} />
            </View>
          </Modal>
          {pregnancy.length != 0 ? <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden' }}><SelectDropdown
            data={pregnancy}
            dropdownStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              flex:1,
              color: "#008080"
            }}
            buttonStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              width: '90%'
            }}
            dropDownMaxWidth={'80%'}
            defaultButtonText={"Silahkan pilih history"}
            buttonTextStyle={{ color: "#008080" }}
            rowTextStyle={{ color: "#008080" }}
            search={true}
            onSelect={(selectedItem, index) => {
              displayChart(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name
            }}
            rowTextForSelection={(item, index) => {
              return item.name
            }}
          /></View> : <Text style={{ color: 'white' }}>No Pregnancy Data Yet</Text>
          }
          {selectedData.length != 0 ? <View><Text style={{ textAlign: 'center', color: 'white', fontSize: 22, marginBottom: 5, marginTop: 5 }}>History Berat Badan Ibu</Text><BarChart
            data={{
              labels: dateData,
              datasets: [
                {
                  data: selectedData
                }
              ]
            }}
            width={Dimensions.get("window").width - 10} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            yAxisInterval={0.5} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ff0fff",
              backgroundGradientFrom: "#eeeeee",
              backgroundGradientTo: "#eeeeee",
              fillShadowGradient: '#1fffee', // THIS
              fillShadowGradientOpacity: 1, // THIS
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
          /></View> : <Text style={{ color: 'white' }}>Silahkan pilih periode kehamilan yang ingin dilihat</Text>}
          {selectedBabyData.length != 0 ? <View><Text style={{ textAlign: 'center', color: 'white', fontSize: 22, marginBottom: 5, marginTop: 5 }}>History Berat Bayi</Text><Text style={{ textAlign: 'center', color: 'white', fontSize: 12, marginBottom: 5, marginTop: 5 }}>*tekan chart untuk informasi</Text><BarChart onDataPointClick={(data) => { displayModalMother(data.index) }}
            data={{
              labels: dateBabyData,
              datasets: [
                {
                  data: selectedBabyData,
                  colors: selectedBabyDataOpacityColor
                }
              ]
            }}
            width={Dimensions.get("window").width - 10} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            withCustomBarColorFromData={true}
            flatColor={true}
            showBarTops={true}
            showValuesOnTopOfBars={true}
            fromZero={true}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#eeeeee",
              backgroundGradientTo: "#eeeeee",
              fillShadowGradient: '#1fffee', // THIS
              fillShadowGradientOpacity: 1, // THIS
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
          />
            <View><Text style={{ color: 'white', textAlign: 'center' }}>Warna berdasarkan perbedaan berat badan</Text></View>
            <View style={{ backgroundColor: "#ffffff", alignItems: 'center', overflow: "hidden" }}><Text style={{ fontSize: 22 }}><Text style={{ color: '#1fffee' }}>∎ </Text>Lahir<Text style={{ color: '#FFA9FF' }}>∎ </Text>Kurang <Text style={{ color: '#78A9FF' }}>∎</Text>Cukup<Text style={{ color: '#8E95FF' }}>∎ </Text>Berlebih</Text></View></View> : <Text></Text>}
        </View>
      </ScrollView >
    </View>
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
  modal1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00BCD4",
    height: '100%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 40,

  },
  modal2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00BCD4",
    height: '20%',
    width: '80%',
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

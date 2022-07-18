import React, { useState, useEffect } from 'react';
import {FlatList,Text,View,TouchableHighlight,Image,StatusBar,StyleSheet} from "react-native";
import { GET_CATEGORY } from '../config/querymutation';
import { useQuery } from "@apollo/client";


export default function Category(props){
    const {navigation}=props;
    const { data, loading, error } = useQuery(GET_CATEGORY);
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
          background: '#f9f2ff'
        },
        item: {
          backgroundColor: '#f9c2ff',
          padding: 5,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
        },
        description: {
          fontSize: 20,
        },
        price: {
          fontSize: 16,
        },
      });

    const renderItem = ({ item }) => (
        <View style={styles.item} data-id={item.id} onTouchStart={onClickedItem}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
        </View>
    );

    const onClickedItem = (event=>{
        console.log('clicked');
        navigation.navigate('Articles',{item:event});
        // console.log(event);
    })
        
    return(
        <View style={styles.container}>
        { data!=undefined?
            <FlatList
                data={data.getCategories}
                renderItem={renderItem}
                keyExtractor={(item)=>item.id}
            ></FlatList>
          : <Text>Loading</Text>
        }
        </View>
    )

    
}
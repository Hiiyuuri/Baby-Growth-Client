import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function ArticleCard({  item,getDetail }) {
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


    useEffect(() => {
        // console.log(item);

    }, [])


    const onClickedItem = (event => {
        console.log('clicked on item button');
        getDetail(item);

    })

    return (
        <View style={styles.container}>
            <Card key={item.id}>
                <Card.Content>
                    <Title>{item.id}</Title>
                </Card.Content>
                <Card.Cover source={{ uri: item.imageUrl }} />
                <Title>{item.name}</Title>
                <Card.Actions>
                    <Button onPress={onClickedItem}>View Article</Button>
                </Card.Actions>
            </Card>
        </View>
    )


}
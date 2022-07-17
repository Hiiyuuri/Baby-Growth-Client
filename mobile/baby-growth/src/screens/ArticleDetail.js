import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function ArticleDetail({ navigation, route }) {
    const item = route.params.item
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
        console.log('');
        // console.log(event);
    })

    return (
        <View style={styles.container}>
            <Card>
                <Card.Content>
                <Card.Cover source={{ uri: item.imageUrl }} />
                    <Title>{item.name}</Title>
                    <Paragraph>{item.text}</Paragraph>
                </Card.Content>
                
            </Card>
        </View>
    )


}
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function CategoryCard({ getDetail, item }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
            marginLeft: 5,
            marginRight: 5,
            background: '#008080',
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 5,
            marginVertical: 8,
            marginHorizontal: 16,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            color: '#008080',
            textAlign: 'center'
        },
        description: {
            fontSize: 20,
        },
        price: {
            fontSize: 16,
        },
    });

    const onClickedDetail = (event => {
        getDetail(item.id);
    })

    return (
        <View style={styles.container}>
            <Card key={item.id} onPress={onClickedDetail} style={{
                backgroundColor: 'white',
                borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Title style={styles.title}>{item.names}</Title>
            </Card>
        </View>
    )


}
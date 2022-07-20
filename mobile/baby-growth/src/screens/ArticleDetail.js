import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, Text, View, TouchableHighlight, Image, Dimensions, StatusBar, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function ArticleDetail({ item }) {
    const { width, height } = Dimensions.get('window');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
            background: '#f9f2ff',
            width,
            alignItems: 'center'
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

    return (
        <ScrollView nestedScrollEnabled={true}>
            <View style={styles.container}>
                <Card>
                    <Card.Content>
                        <Card.Cover source={{ uri: item.imageUrl }} />
                        <Title>{item.name}</Title>
                        <Paragraph>{item.text.replace('\\n', '\n')}</Paragraph>
                    </Card.Content>

                </Card>
            </View>
        </ScrollView>
    )


}
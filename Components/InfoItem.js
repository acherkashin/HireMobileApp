import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

export default ({ label, value, hideDevider }) => (
    <View>
        <View style={[styles.infoItem, styles.marginHorizontal]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
        {!hideDevider && <Divider style={styles.marginHorizontal} />}
    </View>
);

const styles = StyleSheet.create({
    marginHorizontal: {
        marginHorizontal: 10
    },
    infoItem: {
        justifyContent: 'center',
        minHeight: 50
    },
    label: {
        fontSize: 12,
    },
    value: {
        color: 'black',
        fontSize: 14,
    },
});
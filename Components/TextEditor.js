import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class TextEditor extends Component {
    render() {
        return (
            <View style={styles.editor}>
                <FormLabel containerStyle={styles.labelContainer}>{this.props.label}</FormLabel>
                <FormInput containerStyle={styles.inputContainer}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                />
                {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    editor: {
        flexDirection: 'row',
    },
    labelContainer: {
        flex: 2,
    },
    inputContainer: {
        flex: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});
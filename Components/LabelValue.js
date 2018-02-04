import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class TextEditor extends Component {
    render() {
        return (
            <View style={styles.editor}>
                <FormLabel containerStyle={styles.labelContainer}>{this.props.label}</FormLabel>
                <TouchableOpacity onPress={this.props.onPress} style={styles.pressControl}>
                    <FormInput
                        containerStyle={styles.inputContainer}
                        editable={false}
                        pointerEvents="none"
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                    />
                </TouchableOpacity>
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
    pressControl: {
        flex: 5,
    },
    inputContainer: {
        marginLeft: 0,
        marginRight: 0,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
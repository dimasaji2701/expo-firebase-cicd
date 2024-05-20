import React from 'react';
//import { colors, sizes } from '../theme';
import { StyleSheet, TextInput } from 'react-native';
import { colors, sizes } from '../../theme';

const Input = ({ value, onChangeText, placeholder}) => {
    return (
        <TextInput 
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 56,
        width: '100%',
        marginBottom: sizes.xl8,
        paddingHorizontal: sizes.large,
        paddingVertical: sizes.xl,
        backgroundColor: colors.textColors.whiteGrey,
        borderRadius: sizes.medium,
        fontWeight: '600'
    },
});

export default Input;

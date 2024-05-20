
import {StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors, sizes } from "../../theme";

 
const Button = ({onPress, title}) => {
    return (
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={styles.btnTitle}>{title}</Text>
            </TouchableOpacity>
    );
}
 
const styles = StyleSheet.create({
   
    btn: {
        backgroundColor: colors.primary.blue,
        height: 56,
        borderRadius: sizes.medium,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        color: colors.textColors.white,
        fontWeight: '600'
    }
});
 
export default Button;
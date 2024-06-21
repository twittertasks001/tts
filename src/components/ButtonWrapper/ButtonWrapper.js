import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { buttonstyles } from './ButtonWrapperStyles'
import { COLORS } from '../../util/color';

const ButtonWrapper = ({ onPress, text, style, children, isLoading, textStyle }) => {
	return (
		<TouchableOpacity style={[buttonstyles.button, style]} onPress={onPress}>
			{children || <Text style={[buttonstyles.buttonText, textStyle]}>
				{isLoading ?
					<ActivityIndicator
						size={25}
						color={COLORS.background} />
					:
					text
				}

			</Text>}
		</TouchableOpacity>
	);
};


export default ButtonWrapper;

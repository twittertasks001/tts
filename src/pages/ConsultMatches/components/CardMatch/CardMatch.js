import { Text, View, TouchableOpacity } from 'react-native'
import { cardMatchStyles } from './cardMatchStyles'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'

const CardMatch = ({ data, getMatches }) => {
  const navigation = useNavigation()
  return (
    <View style={cardMatchStyles.container}>
      <TouchableOpacity style={cardMatchStyles.containerCard} onPress={() => (navigation.navigate('Match', { id_match: data.id, getMatches }))}>
        <Text style={[cardMatchStyles.text, cardMatchStyles.textMatchName]}>
          {data.name}
        </Text>
        <Text style={cardMatchStyles.text}>
          {data.players && data.players.toString().replaceAll(`,`, ` x `)}
        </Text>
        <Text style={cardMatchStyles.text}>
          {data.date_create && format(new Date(data.date_create), 'dd/MM/yyyy')}
        </Text>
      </TouchableOpacity >
    </View>
  )

}

export default CardMatch
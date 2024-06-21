import { useEffect, useState } from 'react'
import { Text, FlatList, View } from 'react-native'
import { getOpenMatches } from '../../services/match'
import CardMatch from './components/CardMatch/CardMatch'
import HeaderConsultMatch from './components/HeaderConsultMatch/HaderConsultMatch'
import { consultMatchesStyles } from './consultMatchesStyles'

const ConsultMatches = ({ route, navigation }) => {

	const [listMatches, setListMatches] = useState([])

	useEffect(() => {
		getMatches()
	}, [])
	

	const getMatches = async () => {
		let matches = await getOpenMatches()
		setListMatches(matches)
	}

	return (
		<FlatList
			contentContainerStyle={consultMatchesStyles.container}
			data={listMatches}
			ListHeaderComponent={<HeaderConsultMatch list={listMatches} />}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => <CardMatch data={item} getMatches={getMatches} />}
		/>
	)

}

export default ConsultMatches
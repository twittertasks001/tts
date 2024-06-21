import { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {  headerConsultMatchStyles } from './headerConsultMatchStyles'
import TextInputWrapper from '../../../../components/TextInputWrapper/TextInputWrapper'

const HeaderConsultMatch = ({ list }) => {

  return (

    <View>
      <Text style={headerConsultMatchStyles.title}>Consultar partidas</Text>
      <TextInputWrapper
        placeholder={'Pesquisar partidas'}
      />
    </View>
  )

}

export default HeaderConsultMatch
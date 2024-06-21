import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { formNewMatchStyles } from './formStyles';
import ButtonWrapper from '../../components/ButtonWrapper/ButtonWrapper';
import TextInputWrapper from '../../components/TextInputWrapper/TextInputWrapper';
import { useForm, Controller } from 'react-hook-form';
import { createMatch } from '../../services/match';

const FormNewMatch = ({ route, navigation }) => {
  const { selectedPlayers } = route.params;
  const [loadingNewMatch, setLoadingNewMatch] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm();

  const renderPlayerInputs = () => {
    const playerInputs = [];

    for (let i = 0; i < selectedPlayers; i++) {
      playerInputs.push(
        <Controller
          key={i}
          control={control}
          rules={{ required: `O nome do jogador ${i + 1} é obrigatório` }}
          render={({ field }) => (
            <>
              <View style={formNewMatchStyles.inputContainer}>
                <Text style={formNewMatchStyles.label}>{`Nome do jogador ${i + 1}:`}</Text>

                <TextInputWrapper
                  placeholder={`Digite aqui`}
                  value={field.value}
                  onChangeText={field.onChange}
                  style={errors[`jogador${i + 1}`] && formNewMatchStyles.inputError}
                />
                {errors[`jogador${i + 1}`] && <Text style={formNewMatchStyles.errorText}>{errors[`jogador${i + 1}`].message}</Text>}
              </View>
            </>
          )}
          name={`jogador${i + 1}`}
          defaultValue=""
        />
      );
    }

    return playerInputs;
  };

  const handleCreateMatch = async (data) => {

    try {
      setLoadingNewMatch(true)
      let idNewMatch = await createMatch(data, selectedPlayers);
      idNewMatch > 0 && navigation.replace('Match', idNewMatch);
    } catch (error) {
      console.error('Erro ao criar partida e jogadores:', error);
    } finally {
      setLoadingNewMatch(false)
    }


  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={formNewMatchStyles.container}>
        <Text style={formNewMatchStyles.title}>Criar nova partida</Text>
        <Controller
          control={control}
          rules={{ required: 'O nome da partida é obrigatório' }}
          render={({ field }) => (
            <>
              <Text style={formNewMatchStyles.label}>Nome da partida:</Text>
              <View style={formNewMatchStyles.inputContainer}>
                <TextInputWrapper
                  placeholder="Digite aqui"
                  value={field.value}
                  onChangeText={field.onChange}
                  style={errors.nomePartida && formNewMatchStyles.inputError}
                />
                {errors.nomePartida && <Text style={formNewMatchStyles.errorText}>{errors.nomePartida.message}</Text>}
              </View>
            </>
          )}
          name="nomePartida"
          defaultValue=""
        />

        {renderPlayerInputs()}

        <Controller
          control={control}
          rules={{ required: 'O limite de pontos é obrigatório' }}
          render={({ field }) => (
            <View style={formNewMatchStyles.inputContainer}>
              <Text style={formNewMatchStyles.label}>Limite de pontos:</Text>
              <TextInputWrapper
                placeholder="Limite de pontos"
                keyboardType="numeric"
                value={field.value}
                onChangeText={field.onChange}
                style={errors.limitePontos && formNewMatchStyles.inputError}
              />
              {errors.limitePontos && <Text style={formNewMatchStyles.errorText}>{errors.limitePontos.message}</Text>}
            </View>
          )}
          name="limitePontos"
          defaultValue=""
        />

        <ButtonWrapper
          isLoading={loadingNewMatch}
          text="Criar Partida"
          onPress={handleSubmit(handleCreateMatch)}
          style={formNewMatchStyles.button}
        />

      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormNewMatch;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { modalStyles } from './ModalEditInfosStyles';
import { useForm, Controller } from 'react-hook-form';
import TextInputWrapper from '../../../../components/TextInputWrapper/TextInputWrapper';
import ButtonWrapper from '../../../../components/ButtonWrapper/ButtonWrapper';
import { updateMatch } from '../../../../services/match';
import { updateNamePlayers } from '../../../../services/players';
import { useModal } from '../../../../context/ADContext';

const ModailInfoEdit = ({ infos, visible, onClose, getMatchInfo, closeTooltip, getMatches }) => {
  const [atualizeMatch, setAtualizeMatch] = useState(false)
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const { openAd } = useModal()
  useEffect(() => {
    setValue('limit_points', infos.limit_match_points && infos.limit_match_points.toString())
    setValue('match_name', infos.match_name && infos.match_name)
  }, [infos])

  const handleAtualizeMatch = async (data) => {
    const length = infos.players ? infos.players.length : 0

    try {
      setAtualizeMatch(true)
      await updateMatch(infos.id_match, data)
      for (let i = 0; i < length; i++) {
        await updateNamePlayers(infos.players[i].idPlayer, data[`player${i + 1}`])
      }
      await openAd()
      onClose()
      closeTooltip()
      getMatchInfo()
      getMatches()

    } catch (error) {
      console.log(error)
    } finally {
      setAtualizeMatch(false)
    }


  };




  const renderPlayerInputs = () => {
    const playerInputs = [];
    const length = infos.players ? infos.players.length : 0

    for (let i = 0; i < length; i++) {
      setValue(`player${i + 1}`, infos.players[i].name || '')
      playerInputs.push(
        <Controller
          key={i}
          control={control}
          rules={{ required: `O nome do jogador ${i + 1} é obrigatório` }}
          render={({ field }) => (
            <>
              <View style={modalStyles.inputContainer}>
                <Text style={modalStyles.label}>{`Nome do jogador ${i + 1}:`}</Text>

                <TextInputWrapper
                  placeholder={`Digite aqui`}
                  value={field.value}
                  onChangeText={field.onChange}
                  style={errors[`jogador${i + 1}`] && modalStyles.inputError}
                />
                {errors[`jogador${i + 1}`] && <Text style={modalStyles.errorText}>{errors[`jogador${i + 1}`].message}</Text>}
              </View>
            </>
          )}
          name={`player${i + 1}`}
          defaultValue=""
        />
      );
    }

    return playerInputs;
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
    >

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Atualizando partida</Text>
          <Controller
            control={control}
            rules={{ required: 'O nome da partida é obrigatório' }}
            render={({ field, formState }) => (
              <>
                <Text style={modalStyles.label}>Nome da partida:</Text>
                <View style={modalStyles.inputContainer}>
                  <TextInputWrapper
                    placeholder="Digite aqui"
                    value={field.value}
                    onChangeText={field.onChange}
                    style={errors.nomePartida && modalStyles.inputError}
                  />
                  {errors.nomePartida && <Text style={modalStyles.errorText}>{errors.nomePartida.message}</Text>}
                </View>
              </>
            )}
            name="match_name"
            defaultValue=""
          />

          {renderPlayerInputs()}

          <Controller
            control={control}
            rules={{ required: 'O limite de pontos é obrigatório' }}
            render={({ field }) => (
              <View style={modalStyles.inputContainer}>
                <Text style={modalStyles.label}>Limite de pontos:</Text>
                <TextInputWrapper
                  placeholder="Limite de pontos"
                  keyboardType="numeric"
                  value={field.value}
                  onChangeText={field.onChange}
                  style={errors.limitePontos && modalStyles.inputError}
                />
                {errors.limitePontos && <Text style={modalStyles.errorText}>{errors.limitePontos.message}</Text>}
              </View>
            )}
            name="limit_points"
            defaultValue=""
          />

          <ButtonWrapper
            isLoading={atualizeMatch}
            text="Atualizar partida"
            onPress={handleSubmit(handleAtualizeMatch)}
            style={modalStyles.button}
          />

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModailInfoEdit;

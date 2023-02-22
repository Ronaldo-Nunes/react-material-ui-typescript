import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';

import { CidadesService } from '../../../shared/services/api/cidades/CidedesService';
import { useDebounce } from '../../../shared/hooks';

type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutoCompleteCidade {
  isExternalLoading?: boolean;
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidade> = ({ isExternalLoading = false }) => {
  const { fieldName, defaultValue, error, clearError, registerField } = useField('cidadeId'); // importação do UNFORM

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const { debounce } = useDebounce();
  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setLoading(true);
    debounce(() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            // TODO
          } else {
            setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
          }
        });
    });
  }, [busca]);


  const autoCompleteSelectedOption = useMemo(() => {
    if (selectedId === undefined) return null;

    const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
    if (selectedOption === undefined) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem resultados'
      loadingText='Carregando...'

      disablePortal

      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      loading={isLoading}
      popupIcon={(isLoading || isExternalLoading) ? <CircularProgress size={16} /> : undefined}
      onInputChange={(_event, newValue) => setBusca(newValue)}
      size='small'
      options={opcoes}
      onChange={(_event, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Cidade'
          error={error !== undefined}
          helperText={error}
        />
      )}

    />
  );
};

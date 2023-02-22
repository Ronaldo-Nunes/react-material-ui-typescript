import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidedesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard = () => {
  const [isLoadingCidades, setLoadingCidades] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [isLoadingPessoas, setLoadingPessoas] = useState(true);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {
    setLoadingPessoas(true);
    PessoasService.getAll(1)
      .then((result) => {
        setLoadingPessoas(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPessoas(result.totalCount);
        }
      });

    setLoadingCidades(true);

    CidadesService.getAll(1)
      .then((result) => {
        setLoadingCidades(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCidades(result.totalCount);
        }
      });
  }, []);



  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={(<FerramentasDaListagem mostrarBotaoNovo={false} />)}>
      <Box width='100%' display='flex'>

        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de cidades</Typography>

                  <Box display='flex' justifyContent='center' alignItems='center' padding={6}>
                    {isLoadingCidades ? (
                      <Typography variant='h6'>Carregando...</Typography>
                    ) : <Typography variant='h1'>{totalCountCidades}</Typography>}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de pessoas</Typography>

                  <Box display='flex' justifyContent='center' alignItems='center' padding={6}>
                    {isLoadingPessoas ? (
                      <Typography variant='h6'>Carregando...</Typography>
                    ) : <Typography variant='h1'>{totalCountPessoas}</Typography>}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

      </Box>
    </LayoutBaseDePagina>
  );
};
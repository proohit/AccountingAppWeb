import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../src/authentication/hooks/useAuthentication';
import { WalletCard } from '../../src/wallets/components/WalletCard';
import { WalletDialogContainer } from '../../src/wallets/components/WalletDialogContainer';
import {
  addWalletDialogState,
  editWalletDialogState,
} from '../../src/wallets/hooks/walletDialogsState';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';
import { Wallet } from '../../src/wallets/models/Wallet';

const WalletPage: React.FunctionComponent = (props) => {
  const { token } = useAuthentication();
  const { data: wallets } = useWalletsQuery(token);

  const [, setAddWalletDialog] = useRecoilState(addWalletDialogState);
  const [, setEditWalletDialog] = useRecoilState(editWalletDialogState);

  const openEditDialog = (wallet: Wallet) => {
    setEditWalletDialog({ open: true, walletToEdit: wallet });
  };

  const openAddDialog = () => {
    setAddWalletDialog({ open: true });
  };

  return wallets ? (
    <Paper style={{ padding: 16 }}>
      <Grid container style={{ gap: 16 }}>
        <Grid item container>
          <WalletDialogContainer />
          <Typography variant="h3">Wallets</Typography>
          <IconButton color="primary" onClick={openAddDialog}>
            <AddBox />
          </IconButton>
        </Grid>
        {wallets.map((wallet) => (
          <Grid key={wallet.id}>
            <WalletCard wallet={wallet} onWalletClicked={openEditDialog} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  ) : (
    <Fragment />
  );
};
export default WalletPage;
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Fragment } from 'react';

import ECPLinks from '../map/translatedGrids/links.json';

import { Dictionary, getWinner, getLoser, disputedSeatsObj } from "../../utilities";

window.ECPLinks = ECPLinks;

export default function AlertDialog({
    open,
    handleClickOpen,
    handleClose,
    popUpData,
    votesKey
}) {

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h5" component="div">
                            {popUpData.seatData.seat}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {popUpData.seatData.loc}
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <IntroDivider {...popUpData} votesKey={votesKey} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

function IntroDivider(props) {
    const votesKey = props.votesKey;
    console.log(props);
    let winner = props ? getWinner(props.data, votesKey) : null;
    let loser = props ? getLoser(props.data, votesKey) : null;

    if (winner.votes === 0) {
        winner = null;
        loser = null;
    }

    let margin;

    if (winner) {
        margin = (winner[votesKey] - loser[votesKey]).toLocaleString();
    } else {
        margin = "N/A"
    }

    const isDisputed = disputedSeatsObj[props.seatData.seat]
    console.log(ECPLinks[`NA-${props.seat}`])
    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="p" fontWeight='fontWeightMedium' component="div">
                        Margin of Victory:
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        {margin}
                    </Typography>
                </Stack>
            </Box>
            <Box sx={{ p: 2 }}>
                {winner
                    ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Candidate</TableCell>
                                    <TableCell>Party</TableCell>
                                    <TableCell>Votes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{winner.candidate}</TableCell>
                                    <TableCell>{Dictionary[winner.party]}</TableCell>
                                    <TableCell>{winner[votesKey]}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={2}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{loser.candidate}</TableCell>
                                    <TableCell>{Dictionary[loser.party]}</TableCell>
                                    <TableCell>{loser[votesKey]}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <p>Elections Postponed</p>
                }
            </Box>
            <Divider />
            {
                winner
                &&
                <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="body2">
                        View Source
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {
                            isDisputed
                            &&
                            <Chip
                                label="form45.com"
                                size="small"
                                clickable
                                component="a"
                                target="_blank"
                                href={`https://form45.com/constituency_details/NA-${props.seat}`}
                            />
                        }
                        <Chip
                            label="ECP"
                            size="small"
                            clickable
                            component="a"
                            target="_blank"
                            href={ECPLinks[`NA-${props.seat}`]}
                        />
                    </Stack>
                </Box>
            }
        </Card>
    );
}
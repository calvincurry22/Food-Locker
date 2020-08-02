import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default ({ audit, violationCategories, blankViolation, violations }) => {
    const classes = useStyles();
    console.log(audit.passed)
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Review before submission
             </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Details
                    </Typography>
                    <Typography gutterBottom>Date: {audit.auditDate}</Typography>
                    <Typography gutterBottom>Auditor Name: {audit.auditorName}</Typography>
                    <Typography gutterBottom>Score: {audit.score}</Typography>
                    <Typography gutterBottom>Passed?: {audit.passed === true ? "Yes" : "No"}</Typography>
                </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom className={classes.title}>
                Violations
                </Typography>
            <List disablePadding>
                {violations.map((v, idx) => {
                    const category = violationCategories.find(c => c.id === v.violationCategoryId)

                    return (
                        <React.Fragment key={v.id}>
                            <Typography variant="h6">Issue #{idx + 1}</Typography>
                            <Typography>Description: {v.description}</Typography>
                            <Typography>Category: {category.name}</Typography>
                            <Typography>Critical Issue?: {v.isCritical}</Typography>
                        </React.Fragment>
                    )
                })}
            </List>

        </>
    );
}
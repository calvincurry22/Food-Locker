import React from 'react';
import './Audit.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
    }
}));

export default ({ audit, violationCategories, violations }) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Review before submission
            </Typography>
            <div className="auditReviewPage">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            Details
                    </Typography>
                        <Typography gutterBottom>Date: {audit.auditDate}</Typography>
                        <Typography gutterBottom>Auditor Name: {audit.auditorName}</Typography>
                        <Typography gutterBottom>Score: {audit.score}</Typography>
                        <Typography gutterBottom>Passed?: {audit.passed === 'pass' ? "Yes" : "No"}</Typography>
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
            </div>
        </>
    );
}
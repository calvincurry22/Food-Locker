import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Review from './Review';
import AuditForm from './AuditForm';
import AuditViolationsForm from './AuditViolationsForm';
import { useHistory } from 'react-router-dom';
import { ViolationCategoryContext } from '../../providers/ViolationCategoryProvider';
import SideNav from '../SideNav';
import { Container } from '@material-ui/core';
import { AuditContext } from '../../providers/AuditProvider';
import { AuditViolationContext } from '../../providers/AuditViolationProvider';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '} FoodLocker {new Date().getFullYear()} {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));



export default () => {
    const classes = useStyles();
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0);
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { getAllViolationCategories, violationCategories } = useContext(ViolationCategoryContext)
    const { saveAudit } = useContext(AuditContext)
    const { saveViolation } = useContext(AuditViolationContext)
    const blankViolation = { auditId: '', isCritical: '', violationCategoryId: '', description: '' };
    const [violations, setViolations] = useState([
        { ...blankViolation }
    ]);

    const steps = ['Audit Info', 'Violations', 'Review Audit Record'];

    const [value, setValue] = useState('pass');
    const [audit, setAudit] = useState({
        auditorName: '',
        auditDate: '',
        score: '',
        passed: (value === 'pass') ? true : false,
        userId: currentUser.id
    })
    useEffect(() => {
        getAllViolationCategories()
    }, [])

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AuditForm
                    audit={audit}
                    setAudit={setAudit}
                    value={value}
                    setValue={setValue}
                />;
            case 1:
                return <AuditViolationsForm
                    audit={audit}
                    violationCategories={violationCategories}
                    blankViolation={blankViolation}
                    violations={violations}
                    setViolations={setViolations} />;
            case 2:
                return <Review
                    audit={audit}
                    violationCategories={violationCategories}
                    blankViolation={blankViolation}
                    violations={violations}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const createNewRecord = (auditObj, violationArray) => {
        saveAudit(auditObj)
            .then(r => {
                violationArray.map(v => {
                    if (v.isCritical === 'no') {
                        v.isCritical = false
                    } else {
                        v.isCritical = true
                    }
                    v.auditId = r.id;
                    saveViolation(v)
                })
            })
    }

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <SideNav />
                <main className={classes.layout}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h4" align="center">
                                New Audit Record
                    </Typography>
                            <Stepper activeStep={activeStep} className={classes.stepper}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <>
                                {activeStep === steps.length ? (
                                    <>
                                        <Typography variant="h5" gutterBottom>
                                            Submission Successful.
                                </Typography>
                                        <Typography variant="subtitle1">
                                            Return to view new audit record.
                                </Typography>
                                        <Button onClick={() => history.push("/audits")}>Return</Button>
                                    </>
                                ) : (
                                        <>

                                            {getStepContent(activeStep)}
                                            <div className={classes.buttons}>
                                                {activeStep !== 0 && (
                                                    <Button onClick={handleBack} className={classes.button}>
                                                        Back
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        if (activeStep === steps.length - 1) {
                                                            createNewRecord(audit, violations)
                                                            handleNext()
                                                        } else {
                                                            handleNext()
                                                        }
                                                    }}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Submit Record' : 'Next'}
                                                </Button>
                                            </div>

                                        </>
                                    )}
                            </>
                        </Paper>
                        <Copyright />
                    </Container>
                </main>
            </div>
        </>
    );
}
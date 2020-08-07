import React from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';


export default ({ audit, history }) => {

    const date = new Date(audit.auditDate).toLocaleDateString()

    return (
        <>
            {audit &&
                <TableRow>
                    <TableCell>
                        {date}
                    </TableCell>
                    <TableCell>{audit.auditorName}</TableCell>
                    <TableCell>{audit.score}</TableCell>
                    <TableCell>{audit.passed ? "Yes" : "No"}</TableCell>
                    <TableCell>
                        <Button
                            variant="contained"
                            onClick={() => {
                                history.push(`/audit/${audit.id}`)
                            }}
                        >
                            Details
                        </Button>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}
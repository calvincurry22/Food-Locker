import React from 'react';
import AuditDetailsCharts from './AuditDetailsCharts';
import { Document, Page, View, Text, Canvas } from '@react-pdf/renderer';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';

export default ({ audit, auditViolations, charts, violationCategories }) => {
    let i = 0;
    return (
        <Document>
            <Page>
                <View>
                    <Text>Audit Details</Text>
                </View>
                {audit &&
                    <View>
                        <Text className="taskListTyopgraphy">
                            Date: {new Date(audit.auditDate).toLocaleDateString()}
                        </Text>
                        <Text>
                            Score: {audit.score}
                        </Text>
                        <Text>
                            Passed? {audit.passed ? "Yes" : "No"}
                        </Text>
                        <Text>
                            Auditor Name: {audit.auditorName}
                        </Text>
                        <Text>Violations</Text>
                        {
                            auditViolations.map(a => (
                                <View>
                                    <Text>
                                        Violation # {i += 1}
                                    </Text>
                                    <Text>
                                        Category: {a.violationCategory.name}
                                    </Text>
                                    <Text>
                                        Issue: {a.description}
                                    </Text>
                                    <Text>
                                        Critical issue ? : {a.isCritical ? "Yes" : "No"}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                }
                <View>
                    <Text>Charts</Text>
                    {charts}
                </View>
            </Page>
        </Document>
    )
}
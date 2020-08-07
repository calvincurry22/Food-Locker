import React from 'react';
import './FoodSafetyResources.css';
import { Typography, List, ListItem, Divider } from '@material-ui/core';

export default () => {


    return (
        <>
            <Typography variant="h6">
                Food Safety Resources
            </Typography>
            <List>
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fda.gov/media/137867/download"
                    >
                        COVID-19 Re-opening Food Safety Checklist
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fda.gov/food/fda-food-code/state-retail-and-food-service-codes-and-regulations-state"
                    >
                        Food Safety Regulations by state
                    </a>
                </ListItem>
                <Divider />

                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets"
                    >
                        Food Safety Fact Sheets
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/!ut/p/a1/jY_RCoJAFES_pQ9Y7jVN8lGEUEtFpNr2JZbaVaFccZeivj6jpyLLO08XzswwwIACa_ilLrmpVcNPz5-5e8zRtbwA48yzFhilmzxbBgHOi1kP7H4AqT3SP3A-_vPHIwqmXRIkJbCWm4rUjVRAS2EIb_RVdBqoVOpINJfC3IjkB0N0JYTRsAX2no5Wryi1CyeMUxsz5xP4Mv8FDO9rz2t6X4VYR_7kAeoGtjg!/?1dmy&urile=wcm%3apath%3a%2FFSIS-Content%2Finternet%2Fmain%2Ftopics%2Ffood-safety-education"
                    >
                        Food Safety Education
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fsis.usda.gov/wps/portal/fsis/topics/recalls-and-public-health-alerts/current-recalls-and-alerts"
                    >
                        USDA Recalls
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts"
                    >
                        FDA Recalls
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/hazard-analysis-critical-control-point-haccp"
                    >
                        HACCP Information
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.business.com/articles/guide-to-food-handler-safety-certifications/"
                    >
                        Restaurant Food Handler Certification Guide
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fda.gov/food/food-safety-during-emergencies/food-safety-and-coronavirus-disease-2019-covid-19"
                    >
                        Information on food safety and COVID-19
                    </a>
                </ListItem>
                <Divider />
                <ListItem>
                    <a
                        className="dashboardLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.fda.gov/food/fda-food-code/state-retail-and-food-service-codes-and-regulations-state"
                    >
                        Information on food regulations by state
                    </a>
                </ListItem>
            </List>
        </>
    )
}
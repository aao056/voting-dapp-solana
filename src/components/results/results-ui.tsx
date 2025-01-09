import React, { useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { valueFormatter, useCandidateScores } from './results-data-access';
import { redirect } from 'next/navigation'

export function ResultsChart() {

    const size = {
        width: 500,
        height: 200,
    };

    const candidates_scores: any = useCandidateScores();

    useEffect(() => {
        if (!candidates_scores) {
            redirect('/votingdapp');
        }
    }, [candidates_scores]);

    const data = {
        data: candidates_scores || [], // Provide a fallback to avoid errors during rendering
        valueFormatter,
    };

    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 44,
                    arcLabelRadius: '60%',
                    ...data,
                },
            ]}
            slotProps={{
                legend: {
                    labelStyle: {
                        fontSize: 14,
                        fill: '#A6ADBB',
                    },
                },
            }}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                },
            }}
            {...size}
        />
    );
}

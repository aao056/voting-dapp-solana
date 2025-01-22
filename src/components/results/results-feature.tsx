'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useVotingdappProgram } from '../votingdapp/votingdapp-data-access'
import { ResultsChart } from "./results-ui"
import { WalletButton } from '../solana/solana-provider'
import getUnixInDate from '@/utils/getUnixInDate'
import { AccountTransactions } from '../account/account-ui'
import { useState, useEffect } from 'react'

export default function ResultsFeature() {
    const { publicKey } = useWallet()
    const { accounts, programId } = useVotingdappProgram()
    const [electionHasFinished, setElectionHasFinished] = useState(false)
    const [endTime, setEndTime] = useState(null)

    // Extract and parse the election end time
    useEffect(() => {
        if (accounts.data && accounts.data.length) {
            const endTimeUnix = accounts.data[0].account?.endTime.toNumber()
            const parsedDate = getUnixInDate(endTimeUnix)
            if (!parsedDate) setEndTime(parsedDate)

            const endDate = new Date(parsedDate)
            if (endDate < new Date()) {
                setElectionHasFinished(true)
            }
        }
    }, [accounts.data])

    return publicKey ? (
        <div>
            <AppHero
                title={"Election results"}
                subtitle={'This page displays the election results'}
            >
                <p className="mb-6">
                    <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
                </p>
            </AppHero>
            {electionHasFinished ? (
                <div>
                    <div className='my-2'>
                        <ResultsChart />
                    </div>
                    <div className='my-8'>
                        <AccountTransactions address={programId} />
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg font-medium">
                        The election is still taking place. Please come back after the election has finished.
                    </p>
                </div>
            )}
        </div>
    ) : (
        <div className="max-w-4xl mx-auto">
            <div className="hero py-[64px]">
                <div className="hero-content text-center">
                    <WalletButton />
                </div>
            </div>
        </div>
    )
}

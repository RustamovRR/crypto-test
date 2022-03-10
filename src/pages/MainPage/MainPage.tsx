import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Column } from 'react-table'

import Table from '../../components/Table'
import { getCryptos } from '../../redux/crypto/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import './mainpage.css'
import Loader from '../../components/Loader'

const MainPage = () => {
    const [limit, setLimit] = useState<number | string>(10)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [currency, setCurrency] = useState<string>('EUR')

    const dispatch = useAppDispatch()
    const { data } = useAppSelector(state => state.crypto)

    useEffect(() => {
        handleClick()
    }, [isFetching])

    const handleClick = () => {
        axios(`${process.env.REACT_APP_URL}?limit=${limit}&tsym=${currency}`)
            .then(res => dispatch(getCryptos(res.data?.Data)))
            .then(() => setIsFetching(false))
    }
    console.log(currency)

    const diffPercentage = (a: number, b: number): number => {
        return (a - b) / b * 100
    }

    const columns: Column[] = useMemo(
        () => [
            {
                Header: 'Coin name',
                accessor: 'CoinInfo.Internal'
            },
            {
                Header: `Current Price (${currency})`,
                accessor: `RAW[${currency}][PRICE]`,
                Cell: ({ cell }) => {
                    const res = cell.row.original as { RAW: any, DISPLAY: any }
                    return `${res.DISPLAY[currency]?.TOSYMBOL} ${+cell.value?.toFixed(2)}`
                }
            },
            {
                Header: `Opening Price (${currency})`,
                accessor: `RAW[${currency}][OPENHOUR]`,
                Cell: ({ cell }) => {
                    const res = cell.row.original as { RAW: any, DISPLAY: any }
                    return `${res.DISPLAY[currency]?.TOSYMBOL} ${+cell.value?.toFixed(2)}`
                }
            },
            {
                Header: 'Price Increase',
                accessor: `RAW[${currency}][CHANGEHOUR]`,
                Cell: ({ cell }) => {
                    const res = cell.row.original as { RAW: any, DISPLAY: any }
                    const percentage = diffPercentage(res.RAW[currency]?.PRICE, res.RAW[currency]?.OPENHOUR).toFixed(3)
                    const diff = (res.RAW[currency]?.PRICE - res.RAW[currency]?.OPENHOUR).toFixed(2)

                    return `${percentage}% (${res.DISPLAY[currency]?.TOSYMBOL} ${diff})`
                }
            }
        ], [isFetching]
    )
    const maxLimit = 48

    return (
        <div className='mainpage_root'>
            {limit > maxLimit && <span>max limit {maxLimit}</span>}
            <section>
                <input
                    type='text'
                    placeholder='enter limit'
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                />

                <select
                    name="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EURO</option>
                </select>

                <button
                    disabled={isFetching || limit > maxLimit}
                    onClick={() => limit <= maxLimit && setIsFetching(true)}
                >
                    Get data
                </button>

                {
                    isFetching
                        ? <span>Fetching data...</span>
                        : <span>Fetched {data?.length} data</span>
                }
            </section>

            {
                data?.length
                    ? <Table columns={columns} data={data || []} />
                    : <Loader />
            }

        </div>
    )
}

export default MainPage
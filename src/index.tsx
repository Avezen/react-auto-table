import React, {Component} from 'react';
import {TableComponent} from './TableComponent';
import './App.css';

export interface AutoTableProps {
    data?: any[];
    currentPage: number;
    setCurrentPage: any;
    pages: number;
    search: string;
    setSearch: any;
    sortBy: string;
    setSortBy: any;
    sortDirection: number;
    setSortDirection: any;
    isFetching: boolean;
    error?: any;
    colWidths?: number[];
    tableHead?: string[];
    config?: any;
}

interface AutoTableState {
    tableHead: string[];
    currentlyOpenedTruncatedString: {
        id: any,
        key: any
    };
}

export class AutoTable extends Component<AutoTableProps, AutoTableState> {
    state = {
        tableHead: this.props.tableHead ? this.props.tableHead : [],
        currentlyOpenedTruncatedString: {
            id: null,
            key: null,
        },
    };

    componentDidUpdate(prevProps: AutoTableProps, prevState: AutoTableState) {
        const {data} = this.props;

        if (data && prevProps.data !== data && !this.props.tableHead) {
            const tableHead = Object.keys(data[0]);
            this.setState({tableHead});
        }
    }

    render() {
        const {tableHead, currentlyOpenedTruncatedString} = this.state;
        const {data, currentPage, pages, search, sortBy, sortDirection, isFetching, error, colWidths, config} = this.props;

        return (
            <TableComponent
                data={data}
                currentPage={currentPage}
                setCurrentPage={this.setCurrentPage}
                modifyCurrentPage={this.modifyCurrentPage}
                pages={pages}
                search={search}
                setSearch={this.setSearch}
                sortBy={sortBy}
                setSortBy={this.setSortBy}
                sortDirection={sortDirection}
                isFetching={isFetching}
                error={error}
                colWidths={colWidths}
                tableHead={tableHead}
                currentlyOpenedTd={currentlyOpenedTruncatedString}
                toggleTd={this.toggleCurrentlyOpenedTruncatedString}
                config={config}
            />
        );
    }

    toggleCurrentlyOpenedTruncatedString = (id: number, key: number) => {
        const {currentlyOpenedTruncatedString} = this.state;

        if (currentlyOpenedTruncatedString.id === id && currentlyOpenedTruncatedString.key === key) {
            this.setState({currentlyOpenedTruncatedString: {id: null, key: null}});
        } else {
            this.setState({currentlyOpenedTruncatedString: {id, key}});
        }
    };

    setCurrentPage = (e: any) => {
        const {setCurrentPage, pages} = this.props;
        const newCurrentPage = parseInt(e.target.value, 10);

        if (!newCurrentPage || (newCurrentPage > pages || newCurrentPage <= 0)) {
            return;
        }

        setCurrentPage(newCurrentPage);
    };

    modifyCurrentPage = (modifyBy: number) => {
        const {currentPage, setCurrentPage, pages} = this.props;
        const newCurrentPage = currentPage + modifyBy;

        if (newCurrentPage > pages || newCurrentPage <= 0) {
            return;
        }

        setCurrentPage(newCurrentPage);
    };

    setSearch = (e: any) => {
        const {setSearch} = this.props;

        setSearch(e.target.value);
    };

    setSortBy = (value: string) => {
        const {sortBy, setSortBy, sortDirection, setSortDirection} = this.props;

        let newSortDirection = sortDirection;

        if (value === sortBy) {
            newSortDirection = newSortDirection * -1;

            setSortDirection(newSortDirection);
        } else {
            newSortDirection = 1;

            setSortDirection(newSortDirection);
            setSortBy(value);
        }
    };
}

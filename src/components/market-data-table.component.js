import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { connect } from "react-redux";
import { findMarketData, addFavoriteAsset, removeFavoriteAsset, addBadAsset, removeBadAsset } from "../actions/markets";

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import FormLabel from '@mui/material/FormLabel';

const SliderWithTooltip = createSliderWithTooltip(Slider);

class MarketDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
       delay: 15,
       intervalId: '',
       showHidden: false
    };
  }

  componentDidMount() {
    this.props.findMarketData('BINANCE', 'USDT');
    this.setState({ intervalId: this.createInterval() })
  }

  updateInterval() {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: this.createInterval() })
  }

  createInterval() {
    return setInterval(() => {
      this.props.findMarketData('BINANCE', 'USDT');
    }, this.state.delay * 1000);
  }

  render() {
    const { delay, showHidden } = this.state;
    const marketData = this.props.items;

    const headers = [
      {
        id: 'favorite',
        numeric: false,
        label: 'Favorite'
      },
      {
        id: 'name',
        numeric: false,
        label: 'Name'
      },
      {
        id: 'price',
        numeric: true,
        label: 'Price'
      },
      {
        id: 'change24hrs',
        numeric: true,
        label: 'Change - 24hrs'
      },
      {
        id: 'volume24hrs',
        numeric: true,
        label: 'Volume - 24hrs'
      },
      {
        id: 'Hide',
        numeric: false,
        label: 'Hide'
      }
    ];

    if (!marketData) return
    <div>
        <h3> Please wait while fetching market data... </h3>
    </div>;

    return (
      <Grid sx={{ width: '100%'}} container justifyContent="center">
        <Paper sx={{ width: '90%' }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='small'
            >
            <TableHead>
              <TableRow className="top-header">
                <TableCell colSpan={2}>
                 <a target="_blank" rel="noreferrer" href="https://liverton.com">
                  <img className="default-logo" alt="Liverton" src="https://liverton.com/wp-content/uploads/sites/11/2020/11/Liverton-Logo-No-Technology-Group-inline.png"/>
                 </a>
                </TableCell>
                <TableCell align='right'>
                  <FormLabel>Refresh Interval</FormLabel>
                </TableCell>
                <TableCell align='right'>
                  <SliderWithTooltip
                     min={5}
                     onChange={value => this.setState({ delay: value})}
                     value={delay}
                     onAfterChange={value => this.updateInterval()}
                   />
                </TableCell>
                <TableCell sx={{ minWidth: 300 }} align='right' colSpan={2}>
                  <FormLabel>Show Bad Currencies</FormLabel>
                  <Checkbox
                    color="primary"
                    defaultChecked={showHidden}
                    onChange={ e => {
                      this.setState({ showHidden: e.target.checked});
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow className="header">
                {headers.map((header) => (
                  <TableCell
                    key={header.id}
                    align={header.numeric ? 'right' : 'left'}
                    padding={header.disablePadding ? 'none' : 'normal'}
                  >
                    <TableSortLabel>
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
              <TableBody>
                {marketData.map((row) =>
                    <TableRow
                      hover
                      role="checkbox"
                      hidden = { !showHidden ? row.hidden : false }
                      className= { row.favorite ? 'fave' : ''}
                      key={row.base_asset}
                    >
                      <TableCell padding="checkbox">
                       <Checkbox
                          color="primary"
                          defaultChecked={row.favorite}
                          onChange={ e => {
                            // Workaround, For some reason this works???
                            this.setState({});
                            row.favorite = e.target.checked;
                            if (e.target.checked) {
                              this.props.addFavoriteAsset(row.symbol);
                            } else {
                              this.props.removeFavoriteAsset(row.symbol);
                            }
                          }}
                          checkedIcon={ <img className="fave-icon" alt="doge" src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/XA6KIXE6FBFM5EWSA25JI5YAU4.jpg"/> }
                        />
                      </TableCell>
                      <TableCell align="left">{row.base_asset}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.change_24h}</TableCell>
                      <TableCell align="right">{row.volume_24h}</TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary"
                          defaultChecked={row.hidden}
                          onChange={ e => {
                            // Workaround, For some reason this works???
                            this.setState({});
                            row.hidden = e.target.checked;
                            if (e.target.checked) {
                              this.props.addBadAsset(row.symbol);
                            } else {
                              this.props.removeBadAsset(row.symbol);
                            }
                          }}
                          checkedIcon= {<DeleteIcon/>}
                        />
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.markets,
  };
};

export default connect(mapStateToProps, { findMarketData, addFavoriteAsset, removeFavoriteAsset, addBadAsset, removeBadAsset })(MarketDataTable);